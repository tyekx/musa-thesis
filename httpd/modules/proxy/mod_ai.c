#include "mod_ai.h"
#include "mod_core.h"
#include "mod_status.h"

static ap_slotmem_instance_t * wlt_slotmem;
static apr_global_mutex_t * wlt_mutex;

static ap_slotmem_instance_t * rdb_slotmem;
static apr_global_mutex_t * rdb_mutex;

static worker_load_table_t wlt;
static request_db_t rdb;
static ap_slotmem_provider_t * smp = NULL;


static unsigned int ui_min(unsigned int a, unsigned int b) {
    return (a < b) ? a : b;
}



/******************************************
 * API implementation
 * */
void ai_get_perf_stat(perf_stat_t * result, const time_stat_t * time_stat) {
    result->total_time = time_stat->proxy_end - time_stat->proxy_start;
    result->queue_time = time_stat->worker_start - time_stat->proxy_start;
    result->process_time = time_stat->worker_end - time_stat->worker_start;
    result->admin_time = time_stat->proxy_end - time_stat->worker_end;
}

long ai_current_timestamp() {
    long value;

    struct timeval tv;
    struct timezone tz;

    gettimeofday(&tv, &tz);

    value = tv.tv_sec;
    value *= 1000000;
    value += tv.tv_usec;

    return value;
}

void ai_timestamp_to_str(char * dest, long timestamp) {
    sprintf(dest, "%ld", timestamp);
}

long ai_get_process_time(const time_stat_t * time_stat) {
    return time_stat->worker_end - time_stat->worker_start;
}

int ai_wlt_increment_minimum(int approx_load) {
    apr_global_mutex_lock(wlt_mutex);
    int return_value = -1;
    apr_status_t read_status = smp->get(wlt_slotmem, 0, (unsigned char*)wlt.loads, wlt.array_size * sizeof(int));

    if(read_status != APR_SUCCESS) {
        ap_log_error(APLOG_MARK, APLOG_WARNING, read_status, NULL, "wlt_read_loads(): smp->get couldnt read shared memory.");
    } else {
        unsigned int min_i = 0;
        for(unsigned int i = 1; i < wlt.array_size; ++i) {
            if(wlt.loads[min_i] > wlt.loads[i]) {
                min_i = i;
            }
        }
        int new_value = wlt.loads[min_i] + approx_load;
        apr_status_t write_status = smp->put(wlt_slotmem, min_i, (unsigned char*)&new_value, sizeof(int));

        if(write_status != APR_SUCCESS) {
            ap_log_error(APLOG_MARK, APLOG_WARNING, read_status, NULL, "wlt_modify_load(): smp->put could not write shared memory.");
        } else {
            return_value = (int)min_i;
        }
    }

    apr_global_mutex_unlock(wlt_mutex);
    return return_value;
}

apr_status_t ai_wlt_decrement_worker_load(int wid, int load) {
    if(wid < 0) { // if the worker_id is -1 then the increment method failed to increment, so we have nothing to do
        return APR_SUCCESS;
    }

    apr_global_mutex_lock(wlt_mutex);
    int value;
    apr_status_t rv = APR_EGENERAL;
    apr_status_t read_status = smp->get(wlt_slotmem, (unsigned int)wid, (unsigned char *) &value, sizeof(int));

    if(read_status != APR_SUCCESS) {
        ap_log_error(APLOG_MARK, APLOG_WARNING, read_status, NULL, "wlt_modify_load(): smp->get could not read shared memory.");
    } else {
        int new_value = value - load;
        apr_status_t write_status = smp->put(wlt_slotmem, (unsigned int)wid, (unsigned char*)&new_value, sizeof(int));

        if(write_status != APR_SUCCESS) {
            ap_log_error(APLOG_MARK, APLOG_WARNING, read_status, NULL, "wlt_modify_load(): smp->put could not write shared memory.");
        } else {
            rv = APR_SUCCESS;
        }
    }
    apr_global_mutex_unlock(wlt_mutex);
    return rv;
}

static int rdb_search(const char * method, const char * url) {
	if(rdb.rows == NULL || rdb.used_slots == 0 || !method || !url) {
		return -1;
	}
    for(int i = 0; i < rdb.used_slots; ++i) {
        if(strcmp(rdb.rows[i].url, url) == 0) {
            if(strcmp(rdb.rows[i].method, method) == 0) {
                return i;
            }
        }
    }
    return -1;
}



/**
 * Non-Thread safe method of reading the slotmem, a guarded way of invoking smp->get
 * the issue was that 0 * sizeof(X) still allocates a new entry if none is used
 * the method also updates rdb.free_slots and rdb.used_slots
 * */
static apr_status_t rdb_pull() {
    unsigned int free_slots = smp->num_free_slots(rdb_slotmem);

    rdb.free_slots = free_slots;
    rdb.used_slots = rdb.array_size - rdb.free_slots;

    if(rdb.used_slots == 0) {
        return APR_SUCCESS;
    }
    return smp->get(rdb_slotmem, 0, (unsigned char*)rdb.rows, rdb.used_slots * sizeof(db_row_t));
}

static void rdb_update_row(int index_of, long pt, rdb_update_result_t * update_result) {
	if(index_of == -1) {
		return;
	}
	
	db_row_t * row = rdb.rows + index_of;
	
    unsigned int prev_pt;
    unsigned int Q;
    unsigned int k;
    int delta_pt;
    double multiplier;

    row->request_count++;

    k = row->request_count;
    prev_pt = row->avg_proc_time;
    Q = ui_min(k, (unsigned int)rdb.correction_factor);
    delta_pt = (int)pt - (int)prev_pt;
    multiplier = 1.0/(double)Q;

    row->avg_proc_time = (unsigned int)((double)prev_pt + multiplier * ((double)delta_pt));

    update_result->Q = Q;
    update_result->delta_pt = delta_pt;
    update_result->request_count = row->request_count;
    update_result->curr_avg_pt = row->avg_proc_time;
    update_result->prev_avg_pt = prev_pt;
}

int ai_rdb_get_estimation(const char * method, const char * url) {
    static const int DEFAULT_IF_NOMATCH = 5000;

    apr_global_mutex_lock(rdb_mutex);

    int approximation = DEFAULT_IF_NOMATCH;

    apr_status_t read_status = rdb_pull();

    if(read_status != APR_SUCCESS) {
        ap_log_error(APLOG_MARK, APLOG_WARNING, read_status, NULL, "Failed to fetch rows, row_count: %d", rdb.used_slots);
    } else {
        int indexOf = rdb_search(method, url);

        if(indexOf != -1) {
            approximation = rdb.rows[indexOf].avg_proc_time;
        }
    }

    apr_global_mutex_unlock(rdb_mutex);
    return approximation;
}

static void rdb_save_row(int row_id, rdb_update_result_t * update_result) {
	if(row_id == -1) {
		update_result->result = APR_EGENERAL;
		return;
	}
            
	apr_status_t put_status = smp->put(rdb_slotmem, (unsigned int)row_id, (unsigned char*)(rdb.rows + row_id), sizeof(db_row_t));

	// logging if error
	if(put_status != APR_SUCCESS) {
		ap_log_error(APLOG_MARK, APLOG_ERR, put_status, NULL, "Failed to put next entry into RDB");
		update_result->result = put_status;
	} else { // OK
		update_result->row_id = row_id;
		update_result->result = APR_SUCCESS;
	}
}

static int rdb_allocate_row(const char * method, const char * url) {
	unsigned int next_index;
	apr_status_t grab_status;
	if(rdb.free_slots == 0) {
		return -1;
	}
	
	grab_status = smp->grab(rdb_slotmem, &next_index);
	if(grab_status == APR_SUCCESS) {
		strcpy(rdb.rows[next_index].method, method);
		strcpy(rdb.rows[next_index].url, url);
		rdb.rows[next_index].avg_proc_time = 0; // will be set at the first update call
		rdb.rows[next_index].request_count = 0; // will be incremented at the first update call
		return (int)next_index;
	} else return -1;
}

void ai_rdb_update(const char * method, const char * url, long process_time, rdb_update_result_t * update_result) {
    apr_global_mutex_lock(rdb_mutex);
	
    // get RDB
    apr_status_t get_status = rdb_pull();

    // failed to get RDB
    if(get_status != APR_SUCCESS) {
        ap_log_error(APLOG_MARK, APLOG_ERR, get_status, NULL, "Failed to get RDB content");
        update_result->result = get_status;
    } else {
        // search RDB
        int index_of = rdb_search(method, url);

        if(index_of == -1) { // row not found
			index_of = rdb_allocate_row(method, url);
        }

		rdb_update_row(index_of, process_time, update_result);
		rdb_save_row(index_of, update_result);
    }

    apr_global_mutex_unlock(rdb_mutex);
}


/******************************************
 * Configuration (Only per-server conf is available for this module)
 * */

static void * ai_conf_create_srv_conf(apr_pool_t * pool, server_rec * s) {
    ai_server_conf_t * srv_conf = apr_pcalloc(pool, sizeof(ai_server_conf_t));

    /// default values
    srv_conf->rdb_capacity = 16;
    srv_conf->wlt_worker_count = 3;
    srv_conf->rdb_correction_factor = 5;

    return (void*)srv_conf;
}

const char * ai_conf_set_capacity(cmd_parms * cmd, void * cfg, const char * arg) {
    ai_server_conf_t * ai_srv_conf = (ai_server_conf_t*)ap_get_module_config(cmd->server->module_config, &ai_module);

    int capacity = atoi(arg);
    if(capacity < 1) {
        return "Request Database capacity must be at least 1.";
    }

    ai_srv_conf->rdb_capacity = capacity;

    return NULL;
}

const char * ai_conf_set_worker(cmd_parms * cmd, void * cfg, const char * arg) {
    ai_server_conf_t * ai_srv_conf = (ai_server_conf_t*)ap_get_module_config(cmd->server->module_config, &ai_module);

    int worker_count = atoi(arg);

    if(worker_count < 1) {
        return "Worker Count must be at least 1.";
    }

    ai_srv_conf->wlt_worker_count = worker_count;

    return NULL;
}

const char * ai_conf_set_correction_factor(cmd_parms * cmd, void * cfg, const char * arg) {
    ai_server_conf_t * ai_srv_conf = (ai_server_conf_t*)ap_get_module_config(cmd->server->module_config, &ai_module);

    int cf = atoi(arg);

    if(cf < 1) {
        return "Correction factor must be at least 1.";
    }

    ai_srv_conf->rdb_correction_factor = cf;

    return NULL;
}

static const command_rec ai_conf_commands[] = {
    AP_INIT_TAKE1("AiRequestDatabaseCapacity", ai_conf_set_capacity, NULL, RSRC_CONF, "Capacity for the Request Database"),
    AP_INIT_TAKE1("AiWorkerCount", ai_conf_set_worker, NULL, RSRC_CONF, "The Worker count for the Worker Load Table"),
    AP_INIT_TAKE1("AiCorrectionFactor", ai_conf_set_correction_factor, NULL, RSRC_CONF, "The Correction Factor for the Request Database"),
    {NULL}
};

/******************************************
 * Server / Per Process initialization
 * */
static void ai_fetch_slotmem_provider() {
    smp = (ap_slotmem_provider_t*) ap_lookup_provider(AP_SLOTMEM_PROVIDER_GROUP, "shm", AP_SLOTMEM_PROVIDER_VERSION);
}

static void wlt_create_mutex(apr_pool_t * pool) {
    apr_status_t create_status = apr_global_mutex_create(&wlt_mutex, "wlt_mutex", APR_LOCK_PROC_PTHREAD, pool);

    if(create_status != APR_SUCCESS) {
        ap_log_perror(APLOG_MARK, APLOG_CRIT, create_status, pool, "Failed to create WLT mutex.");
    }
}

static void wlt_attach_mutex(apr_pool_t * pool) {
    apr_status_t attach_status = apr_global_mutex_child_init(&wlt_mutex, "wlt_mutex", pool);

    if(attach_status != APR_SUCCESS) {
        ap_log_perror(APLOG_MARK, APLOG_CRIT, attach_status, pool, "Failed to attach WLT mutex.");
    }
}

static void wlt_destroy_mutex() {
    apr_status_t destroy_status = apr_global_mutex_destroy(wlt_mutex);

    if(destroy_status != APR_SUCCESS) {
        ap_log_error(APLOG_MARK, APLOG_CRIT, destroy_status, NULL, "Failed to destroy mutex.");
    }
}

static void rdb_create_mutex(apr_pool_t * pool) {
    apr_status_t create_status = apr_global_mutex_create(&rdb_mutex, "rdb_mutex", APR_LOCK_PROC_PTHREAD, pool);

    if(create_status != APR_SUCCESS) {
        ap_log_perror(APLOG_MARK, APLOG_CRIT, create_status, pool, "Failed to create RDB mutex.");
    }
}

static void rdb_attach_mutex(apr_pool_t * pool) {
    apr_status_t attach_status = apr_global_mutex_child_init(&rdb_mutex, "rdb_mutex", pool);

    if(attach_status != APR_SUCCESS) {
        ap_log_perror(APLOG_MARK, APLOG_CRIT, attach_status, NULL, "Failed to attach RDB mutex.");
    }
}

static void rdb_destroy_mutex() {
    apr_status_t destroy_status = apr_global_mutex_destroy(rdb_mutex);

    if(destroy_status != APR_SUCCESS) {
        ap_log_error(APLOG_MARK, APLOG_CRIT, destroy_status, NULL, "Failed to destroy mutex.");
    }
}

static apr_status_t ai_child_exit(void * data) {
    ap_log_error(APLOG_MARK, APLOG_WARNING, 0, NULL, "ai_child_exit(...)");
    wlt_destroy_mutex();
    rdb_destroy_mutex();
    return APR_SUCCESS;
}

static apr_status_t attach_slotmem(ap_slotmem_instance_t ** instance, unsigned int * item_num, const char * name, apr_pool_t * pool) {
    apr_size_t dummy1;
    return smp->attach(instance, name, &dummy1, item_num, pool);
}

static void wlt_attach_slotmem(apr_pool_t * pool) {
    apr_status_t bind_status = attach_slotmem(&wlt_slotmem, &wlt.array_size, AI_WLT_SLOTMEM, pool);

    if(bind_status != APR_SUCCESS) {
        ap_log_error(APLOG_MARK, APLOG_WARNING, bind_status, NULL, "Failed to bind wlt shared memory.");
        return;
    }
    wlt.loads = (int*)apr_palloc(pool, wlt.array_size * sizeof(int));
}

static void rdb_attach_slotmem(apr_pool_t * pool) {
    apr_status_t bind_status = attach_slotmem(&rdb_slotmem, &rdb.array_size, AI_RDB_SLOTMEM, pool);

    if(bind_status != APR_SUCCESS) {
        ap_log_error(APLOG_MARK, APLOG_WARNING, bind_status, NULL, "Failed to bind rdb shared memory");
        return;
    }
}

static void rdb_create_slotmem(apr_pool_t * pool) {
    apr_status_t create_status = smp->create(&rdb_slotmem, AI_RDB_SLOTMEM, sizeof(db_row_t), rdb.array_size, 0, pool);
    
    if(create_status != APR_SUCCESS) {
        ap_log_perror(APLOG_MARK, APLOG_WARNING, create_status, pool, "Failed to create rdb slotmem named: %s", AI_RDB_SLOTMEM);
        return;
    }
}

static void wlt_create_slotmem(apr_pool_t * pool) {
	unsigned int next_index;
	int zero = 0;

    wlt.loads = (int*)apr_pcalloc(pool, wlt.array_size * sizeof(int));
    apr_status_t create_status = smp->create(&wlt_slotmem, AI_WLT_SLOTMEM, sizeof(int), wlt.array_size, 0, pool);

    if(create_status != APR_SUCCESS) {
        ap_log_perror(APLOG_MARK, APLOG_WARNING, create_status, pool, "Failed to create slotmem named: %s", AI_WLT_SLOTMEM);
        return;
    }
	
	for(int i = 0; i < wlt.array_size; ++i) {
		apr_status_t grab_status = smp->grab(wlt_slotmem, &next_index);
		
		if(grab_status != APR_SUCCESS) {
			ap_log_perror(APLOG_MARK, APLOG_ERR, grab_status, pool, "Failed to grab wlt index");
		} else {
			apr_status_t put_status = smp->put(wlt_slotmem, next_index, (unsigned char*)&zero, sizeof(int));

			if(put_status != APR_SUCCESS) {
				ap_log_perror(APLOG_MARK, APLOG_WARNING, put_status, pool, "Failed to zero out shared memory");
			}
    	}
	}
	
    ap_log_error(APLOG_MARK, APLOG_WARNING, 0, NULL, "completed wlt_create_slotmem()");
}


/******************************************
 * Hooks
 * */
static int ai_post_config(apr_pool_t *pconf, apr_pool_t *plog, apr_pool_t *ptemp, server_rec *main_s){
    ai_server_conf_t * srv_conf = (ai_server_conf_t*)ap_get_module_config(main_s->module_config, &ai_module);

    wlt.array_size = (unsigned int)srv_conf->wlt_worker_count;
    rdb.array_size = (unsigned int)srv_conf->rdb_capacity;
    rdb.correction_factor = (unsigned int)srv_conf->rdb_correction_factor;
    
    rdb.rows = (db_row_t*)apr_pcalloc(pconf, rdb.array_size * sizeof(db_row_t));
    
    ap_log_error(APLOG_MARK, APLOG_NOTICE, 0, NULL, "PostConfig %u %u %u", wlt.array_size, rdb.array_size, rdb.correction_factor);

    wlt_create_mutex(pconf);
    rdb_create_mutex(pconf);

    ai_fetch_slotmem_provider();
    
    wlt_create_slotmem(pconf);
    rdb_create_slotmem(pconf);

    return OK;
}

static void ai_child_init(apr_pool_t *p, server_rec *s) {
    ai_server_conf_t * srv_conf = (ai_server_conf_t*)ap_get_module_config(s->module_config, &ai_module);
    rdb.correction_factor = (unsigned int)srv_conf->rdb_correction_factor;
    wlt.array_size = (unsigned int)srv_conf->wlt_worker_count;
    rdb.array_size = (unsigned int)srv_conf->rdb_capacity;
    
    rdb.rows = (db_row_t*)apr_pcalloc(p, rdb.array_size * sizeof(db_row_t));
    wlt.loads = (int*)apr_pcalloc(p, wlt.array_size * sizeof(int));

    wlt_attach_mutex(p);
    rdb_attach_mutex(p);
    ai_fetch_slotmem_provider();
    
    ap_log_error(APLOG_MARK, APLOG_WARNING, 0, NULL, "ai_child_init(...)");
    wlt_attach_slotmem(p);
    rdb_attach_slotmem(p);

    apr_pool_cleanup_register(p, NULL, ai_child_exit, ai_child_exit);
}

static void register_hooks(apr_pool_t *p) {
	/* Only the mpm_winnt has child init hook handler.
     * make sure that we are called after the mpm
     * initializes.
     */
    
    ap_hook_post_config(ai_post_config, NULL, NULL, APR_HOOK_MIDDLE);
    ap_hook_child_init(ai_child_init, NULL, NULL, APR_HOOK_MIDDLE);
}
AP_DECLARE_MODULE(ai) =
{
        STANDARD20_MODULE_STUFF,
        NULL,                    /* create per-directory config structure */
        NULL,                    /* merge per-directory config structures */
        ai_conf_create_srv_conf, /* create per-server config structure */
        NULL,                    /* merge per-server config structures */
        ai_conf_commands,        /* command table */
        register_hooks
};
