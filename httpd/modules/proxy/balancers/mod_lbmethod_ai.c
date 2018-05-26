/* Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

#include "mod_proxy.h"
#include "scoreboard.h"
#include "ap_mpm.h"
#include "apr_version.h"
#include "ap_hooks.h"
#include "mod_ai.h"

module AP_MODULE_DECLARE_DATA lbmethod_tyekx_module;

static int (*ap_proxy_retry_worker_fn)(const char *proxy_function,
        proxy_worker *worker, server_rec *s) = NULL;
        
static proxy_worker *find_by_header_parameter(proxy_balancer *balancer, request_rec *r) {
    int i;
    int total_factor = 0;
    proxy_worker **worker;
    proxy_worker *mycandidate = NULL;
    int cur_lbset = 0;
    int max_lbset = 0;
    int checking_standby;
    int checked_standby;

    if (!ap_proxy_retry_worker_fn) {
        ap_proxy_retry_worker_fn =
                APR_RETRIEVE_OPTIONAL_FN(ap_proxy_retry_worker);
        if (!ap_proxy_retry_worker_fn) {
            /* can only happen if mod_proxy isn't loaded */
            return NULL;
        }
    }
	proxy_worker ** wrs = (proxy_worker**)balancer->workers->elts;
	
	const char * worker_id = apr_table_get(r->headers_in, AI_HK_WORKER_ID);
	
	if(worker_id == NULL) {
		ap_log_error(APLOG_MARK, APLOG_WARNING, 0, NULL, AI_HK_WORKER_ID " was not found in the header.");
		return *wrs;
	}
	
	unsigned int wid = (unsigned int)atoi(worker_id);
	return wrs[wid];
}

/* assumed to be mutex protected by caller */
static apr_status_t reset(proxy_balancer *balancer, server_rec *s)
{
    int i;
    proxy_worker **worker;
    worker = (proxy_worker **)balancer->workers->elts;
    for (i = 0; i < balancer->workers->nelts; i++, worker++) {
        (*worker)->s->lbstatus = 0;
    }
    return APR_SUCCESS;
}

static apr_status_t age(proxy_balancer *balancer, server_rec *s)
{
    return APR_SUCCESS;
}

// apr_status_t (*updatelbstatus)(proxy_balancer *balancer, proxy_worker *elected, server_rec *s

static apr_status_t update_lbstatus(proxy_balancer * balancer, proxy_worker * elected, server_rec * s) {
	return APR_SUCCESS;
}

/*
 * How to add additional lbmethods:
 *   1. Create func which determines "best" candidate worker
 *      (eg: find_best_bytraffic, above)
 *   2. Register it as a provider.
 */
static const proxy_balancer_method ai_lbmethod_provider =
{
    "ai", // name 
    &find_by_header_parameter,
    NULL, // general purpose storage
    &reset,
    &age,
    NULL
};

static void register_hook(apr_pool_t *p)
{
    /* Only the mpm_winnt has child init hook handler.
     * make sure that we are called after the mpm
     * initializes and after the mod_proxy
     */
    ap_register_provider(p, PROXY_LBMETHOD, "ai", "0", &ai_lbmethod_provider);
}

AP_DECLARE_MODULE(lbmethod_ai) = {
    STANDARD20_MODULE_STUFF,
    NULL,       /* create per-directory config structure */
    NULL,       /* merge per-directory config structures */
    NULL,       /* create per-server config structure */
    NULL,       /* merge per-server config structures */
    NULL,       /* command apr_table_t */
    register_hook /* register hooks */
};
