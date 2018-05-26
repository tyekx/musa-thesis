#ifndef HTTPD_MOD_AI_H
#define HTTPD_MOD_AI_H

#include "apr_hooks.h"
#include "apr_optional.h"
#include "apr.h"
#include "apr_lib.h"
#include "util_mutex.h"
#include "apr_global_mutex.h"



#include "httpd.h"
#include "http_config.h"
#include "ap_config.h"
#include "http_core.h"
#include "http_log.h"
#include "ap_provider.h"
#include "ap_slotmem.h"
#include <sys/time.h>

#define AI_DEBUG 1

#if AI_DEBUG == 1
#define AILOG(...) ap_log_error(APLOG_MARK, APLOG_NOTICE, 0, NULL, __VA_ARGS__)
#else
#define AILOG(...)
#endif

#define AI_RDB_SLOTMEM "rdb_mem"
#define AI_WLT_SLOTMEM "wlt_mem"

#define AI_HK_PROXY_START 	 		"Lb-Start"
#define AI_HK_PROXY_END 			"Lb-End"
#define AI_HK_REQUEST_COMPLEXITY	"Lb-Request-Complexity"
#define AI_HK_WORKER_START	 		"Lb-Worker-Start"
#define AI_HK_WORKER_END	 		"Lb-Worker-End"
#define AI_HK_WORKER_ID 			"Lb-Worker-Id"

#define AI_DECLARE(type) 		type
#define AI_DECLARE_NONSTD(type) type	
#define AI_DECLARE_DATA			 

typedef struct {
    int rdb_capacity;
    int rdb_correction_factor;
    int wlt_worker_count;
} ai_server_conf_t;

typedef struct {
    long int proxy_start;
    long int worker_start;
    long int worker_end;
    long int proxy_end;
} time_stat_t;

typedef struct {
    long int queue_time;
    long int process_time;
    long int admin_time;
    long int total_time;
} perf_stat_t;

typedef struct {
    apr_status_t result;
    int row_id;
    int request_count;
    int delta_pt;
    unsigned int Q;
    unsigned int prev_avg_pt;
    unsigned int curr_avg_pt;
} rdb_update_result_t;

typedef struct {
    int * loads;
    unsigned int array_size; /// == ai_server_conf_t.wlt_worker_count
} worker_load_table_t;

typedef struct {
    char method[16];
    char url[16];
    unsigned int avg_proc_time;
    unsigned int request_count;
} db_row_t;

typedef struct {
    db_row_t * rows;
    unsigned int array_size; /// == ai_server_conf_t.rdb_capacity
    unsigned int used_slots;
    unsigned int free_slots;
    int correction_factor;
} request_db_t;

/**
 * Increments the minimum value by approx_load amount.
 * @param approx_load the approximated load to modify the minimum by
 * @return -1 if error or the index of the worker that has been incremented
 */
AI_DECLARE(int) ai_wlt_increment_minimum(int approx_load);

/**
 * Decrements the indexed worker by the given amount
 * @param wid Worker ID to decrement
 * @param load the amount to decrement by
 * @return APR_SUCCESS on success, APR_EGENERAL on failure
 */
AI_DECLARE(apr_status_t) ai_wlt_decrement_worker_load(int wid, int load);

/**
 * Gets the estimation if there any, if none a default value is returned
 * @param method the method of the HTTP request
 * @param url the url of the HTTP request
 * @return the estimation or a default value if not found in the request database
 */
AI_DECLARE(int) ai_rdb_get_estimation(const char * method, const char * url);

/**
 * Updates the estimation in the Request Database
 * @param method the method of the HTTP request
 * @param url the url of the HTTP request
 * @param process_time the process_time
 * @param update_result the result of the method, debug information
 * @return the estimation or a default value if not found in the request database
 */
AI_DECLARE(void) ai_rdb_update(const char * method, const char * url, long process_time, rdb_update_result_t * update_result);

/**
 * Gets the current timestamp as a 64bit signed integer which marks the microseconds elapsed since 1970.01.01.
 * @return the timestamp
 */
AI_DECLARE(long) ai_current_timestamp();

/**
 * Converts the given timestamp to a string. The string must be sufficiently long enough and pre-allocated
 * @param dest the destination string
 * @param timestamp the timestamp that needs to be converted
 */
AI_DECLARE(void) ai_timestamp_to_str(char * dest, long timestamp);

/**
 * Gets only the process_time value from the time_stat type
 * @param time_stat the input values
 * @return worker_end - worker_start
 */
AI_DECLARE(long) ai_get_process_time(const time_stat_t * time_stat);

/**
 * Converts the time_stat to perf_stat
 * @param result [out] the result perf_stat_t pointer
 * @param time_stat [in] the input time_stat_t pointer
 */
AI_DECLARE(void) ai_get_perf_stat(perf_stat_t * result, const time_stat_t * time_stat);

extern module AI_DECLARE_DATA ai_module;

#endif //HTTPD_MOD_AI_H
