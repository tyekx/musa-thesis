exp_exec_prefix = /usr/local/apache2
rel_exec_prefix =
exp_bindir = /usr/local/apache2/bin
rel_bindir = bin
exp_sbindir = /usr/local/apache2/bin
rel_sbindir = bin
exp_libdir = /usr/local/apache2/lib
rel_libdir = lib
exp_libexecdir = /usr/local/apache2/modules
rel_libexecdir = modules
exp_mandir = /usr/local/apache2/man
rel_mandir = man
exp_sysconfdir = /usr/local/apache2/conf
rel_sysconfdir = conf
exp_datadir = /usr/local/apache2
rel_datadir =
exp_installbuilddir = /usr/local/apache2/build
rel_installbuilddir = build
exp_errordir = /usr/local/apache2/error
rel_errordir = error
exp_iconsdir = /usr/local/apache2/icons
rel_iconsdir = icons
exp_htdocsdir = /usr/local/apache2/htdocs
rel_htdocsdir = htdocs
exp_manualdir = /usr/local/apache2/manual
rel_manualdir = manual
exp_cgidir = /usr/local/apache2/cgi-bin
rel_cgidir = cgi-bin
exp_includedir = /usr/local/apache2/include
rel_includedir = include
exp_localstatedir = /usr/local/apache2
rel_localstatedir =
exp_runtimedir = /usr/local/apache2/logs
rel_runtimedir = logs
exp_logfiledir = /usr/local/apache2/logs
rel_logfiledir = logs
exp_proxycachedir = /usr/local/apache2/proxy
rel_proxycachedir = proxy
exp_davlockdb =
rel_davlockdb =
EGREP = /bin/grep -E
PCRE_LIBS = -lpcre
SHLTCFLAGS = -prefer-pic
LTCFLAGS = -prefer-non-pic -static
MKINSTALLDIRS = $(abs_srcdir)/build/mkdir.sh
INSTALL = $(LIBTOOL) --mode=install $(abs_srcdir)/build/install.sh -c
MATH_LIBS = -lm
CRYPT_LIBS = -lcrypt
DTRACE = true
PICFLAGS =
PILDFLAGS =
UNITTEST_CFLAGS =
UNITTEST_LIBS =
MOD_AUTHN_FILE_LDADD =
MOD_AUTHN_DBM_LDADD =
MOD_AUTHN_ANON_LDADD =
MOD_AUTHN_DBD_LDADD =
MOD_AUTHN_SOCACHE_LDADD =
MOD_AUTHN_CORE_LDADD =
MOD_AUTHZ_HOST_LDADD =
MOD_AUTHZ_GROUPFILE_LDADD =
MOD_AUTHZ_USER_LDADD =
MOD_AUTHZ_DBM_LDADD =
MOD_AUTHZ_OWNER_LDADD =
MOD_AUTHZ_DBD_LDADD =
MOD_AUTHZ_CORE_LDADD =
MOD_ACCESS_COMPAT_LDADD =
MOD_AUTH_BASIC_LDADD =
MOD_AUTH_FORM_LDADD =
MOD_AUTH_DIGEST_LDADD =
MOD_ALLOWMETHODS_LDADD =
MOD_ALLOWHANDLERS_LDADD =
MOD_APREQ_LDADD =
MOD_FILE_CACHE_LDADD =
MOD_CACHE_LDADD =
MOD_CACHE_DISK_LDADD =
MOD_CACHE_SOCACHE_LDADD =
MOD_SOCACHE_SHMCB_LDADD =
MOD_SOCACHE_DBM_LDADD =
MOD_SOCACHE_MEMCACHE_LDADD =
MOD_SOCACHE_REDIS_LDADD =
INSTALL_DSO = yes
MOD_SO_LDADD =
MOD_WATCHDOG_LDADD =
MOD_MACRO_LDADD =
MOD_DBD_LDADD =
MOD_DUMPIO_LDADD =
MOD_FIREHOSE_LDADD =
MOD_BUFFER_LDADD =
MOD_RATELIMIT_LDADD =
MOD_REQTIMEOUT_LDADD =
MOD_EXT_FILTER_LDADD =
MOD_REQUEST_LDADD =
MOD_INCLUDE_LDADD =
MOD_FILTER_LDADD =
MOD_SUBSTITUTE_LDADD =
MOD_SED_LDADD = -export-symbols-regex sed_module
MOD_DEFLATE_LDADD = -lz
MOD_HTTP_LDADD =
MOD_MIME_LDADD =
MOD_LOG_CONFIG_LDADD =
MOD_LOG_DEBUG_LDADD =
MOD_LOGIO_LDADD =
MOD_ENV_LDADD =
MOD_EXPIRES_LDADD =
MOD_HEADERS_LDADD =
MOD_UNIQUE_ID_LDADD =
MOD_SETENVIF_LDADD =
MOD_VERSION_LDADD =
MOD_REMOTEIP_LDADD =
MOD_PROXY_LDADD =
MOD_PROXY_CONNECT_LDADD =
MOD_PROXY_FTP_LDADD =
MOD_PROXY_HTTP_LDADD =
MOD_PROXY_FCGI_LDADD =
MOD_PROXY_SCGI_LDADD =
MOD_PROXY_UWSGI_LDADD =
MOD_PROXY_FDPASS_LDADD =
MOD_PROXY_WSTUNNEL_LDADD =
MOD_PROXY_AJP_LDADD =
MOD_PROXY_BALANCER_LDADD =
MOD_PROXY_EXPRESS_LDADD =
MOD_PROXY_HCHECK_LDADD =
MOD_SESSION_LDADD =
MOD_SESSION_COOKIE_LDADD =
MOD_SESSION_DBD_LDADD =
MOD_SLOTMEM_SHM_LDADD =
htpasswd_LTFLAGS =
htdigest_LTFLAGS =
rotatelogs_LTFLAGS =
logresolve_LTFLAGS =
htdbm_LTFLAGS =
ab_LTFLAGS =
checkgid_LTFLAGS =
htcacheclean_LTFLAGS =
httxt2dbm_LTFLAGS =
fcgistarter_LTFLAGS =
firehose_LTFLAGS =
NONPORTABLE_SUPPORT = checkgid fcgistarter
APACHECTL_ULIMIT = ulimit -S -n `ulimit -H -n`
MOD_LBMETHOD_BYREQUESTS_LDADD =
MOD_LBMETHOD_BYTRAFFIC_LDADD =
MOD_LBMETHOD_BYBUSYNESS_LDADD =
MOD_LBMETHOD_HEARTBEAT_LDADD =
MPM_SUBDIRS = event
MPM_LIB = server/mpm/event/libevent.la
SERF_LIBS =
MOD_MPM_EVENT_LDADD =
MOD_MPM_MOTORZ_LDADD =
MOD_UNIXD_LDADD =
MOD_DAV_LDADD =
MOD_STATUS_LDADD =
MOD_AUTOINDEX_LDADD =
MOD_INFO_LDADD =
MOD_CGID_LDADD =
MOD_DAV_FS_LDADD =
MOD_VHOST_ALIAS_LDADD =
MOD_NEGOTIATION_LDADD =
MOD_DIR_LDADD =
MOD_ACTIONS_LDADD =
MOD_SPELING_LDADD =
MOD_USERDIR_LDADD =
MOD_ALIAS_LDADD =
MOD_REWRITE_LDADD =
progname = httpd
OS = unix
OS_DIR = unix
BUILTIN_LIBS = modules/core/libmod_so.la modules/http/libmod_http.la
SHLIBPATH_VAR = LD_LIBRARY_PATH
OS_SPECIFIC_VARS =
HTTPD_LIBS = $(PCRE_LIBS)
PRE_SHARED_CMDS = echo ""
POST_SHARED_CMDS = echo ""
shared_build = shared-build
INSTALL_SUEXEC = setuid
AP_LIBS = $(MOD_SO_LDADD) $(MOD_HTTP_LDADD) $(MOD_MPM_EVENT_LDADD) /usr/local/apr-util/lib/libaprutil-1.la -lexpat /usr/local/apr/lib/libapr-1.la -lrt -lcrypt -lpthread -ldl
AP_BUILD_SRCLIB_DIRS =
AP_CLEAN_SRCLIB_DIRS =
TEST_SUITE_LOCATION = no
HTTPD_VERSION = 2.5.1
HTTPD_MMN = 20171014
abs_srcdir = /home/tyekx/work/webs/httpd
bindir = ${exec_prefix}/bin
sbindir = ${exec_prefix}/bin
cgidir = ${datadir}/cgi-bin
logfiledir = ${localstatedir}/logs
exec_prefix = ${prefix}
datadir = ${prefix}
localstatedir = ${prefix}
mandir = ${prefix}/man
libdir = ${exec_prefix}/lib
libexecdir = ${exec_prefix}/modules
htdocsdir = ${datadir}/htdocs
manualdir = ${datadir}/manual
includedir = ${prefix}/include
errordir = ${datadir}/error
iconsdir = ${datadir}/icons
sysconfdir = ${prefix}/conf
installbuilddir = ${datadir}/build
runtimedir = ${localstatedir}/logs
proxycachedir = ${localstatedir}/proxy
davlockdb =
other_targets =
progname = httpd
prefix = /usr/local/apache2
AWK = gawk
CC = gcc
CPP = gcc -E
CXX =
CPPFLAGS =
CFLAGS =
CXXFLAGS =
CC_FOR_BUILD =
CFLAGS_FOR_BUILD =
LTFLAGS = --silent
LDFLAGS =
LT_LDFLAGS =
SH_LDFLAGS =
HTTPD_LDFLAGS = -export-dynamic
UTIL_LDFLAGS =
LIBS =
DEFS =
INCLUDES =
NOTEST_CPPFLAGS =
NOTEST_CFLAGS =
NOTEST_CXXFLAGS =
NOTEST_LDFLAGS =
NOTEST_LIBS =
EXTRA_CPPFLAGS = -DLINUX -D_REENTRANT -D_GNU_SOURCE
EXTRA_CFLAGS = -g -O2 -pthread
EXTRA_CXXFLAGS =
EXTRA_LDFLAGS =
EXTRA_LIBS =
EXTRA_INCLUDES = -I. -I$(top_srcdir)/os/$(OS_DIR) -I$(top_srcdir)/include -I/usr/local/apr/include/apr-1 -I/usr/local/apr-util/include/apr-1 -I$(top_srcdir)/modules/aaa -I$(top_srcdir)/modules/cache -I$(top_srcdir)/modules/core -I$(top_srcdir)/modules/database -I$(top_srcdir)/modules/filters -I$(top_srcdir)/modules/ldap -I$(top_srcdir)/modules/loggers -I$(top_srcdir)/modules/lua -I$(top_srcdir)/modules/proxy -I$(top_srcdir)/modules/http2 -I$(top_srcdir)/modules/session -I$(top_srcdir)/modules/ssl -I$(top_srcdir)/modules/test -I$(top_srcdir)/server -I$(top_srcdir)/modules/md -I$(top_srcdir)/modules/arch/unix -I$(top_srcdir)/modules/dav/main -I$(top_srcdir)/modules/generators -I$(top_srcdir)/modules/mappers
INTERNAL_CPPFLAGS =
LIBTOOL = /usr/local/apr/build-1/libtool $(LTFLAGS)
SHELL = /bin/bash
RSYNC = /usr/bin/rsync
MODULE_DIRS = aaa apreq cache core database debugging filters http loggers metadata proxy session slotmem proxy/balancers arch/unix dav/main generators dav/fs mappers
MODULE_CLEANDIRS = arch/win32 echo examples experimental ldap lua ssl test http2 md cluster dav/lock
PORT = 80
SSLPORT = 443
CORE_IMPLIB_FILE =
CORE_IMPLIB =
SH_LIBS =
SH_LIBTOOL = $(LIBTOOL)
MK_IMPLIB =
MKDEP = $(CC) -MM
INSTALL_PROG_FLAGS =
MPM_MODULES =
ENABLED_MPM_MODULE =
DSO_MODULES = authn_file authn_dbm authn_anon authn_dbd authn_socache authn_core authz_host authz_groupfile authz_user authz_dbm authz_owner authz_dbd authz_core access_compat auth_basic auth_form auth_digest allowmethods allowhandlers apreq file_cache cache cache_disk cache_socache socache_shmcb socache_dbm socache_memcache socache_redis watchdog macro dbd dumpio firehose buffer ratelimit reqtimeout ext_filter request include filter substitute sed deflate mime log_config log_debug logio env expires headers unique_id setenvif version remoteip proxy proxy_connect proxy_ftp proxy_http proxy_fcgi proxy_scgi proxy_uwsgi proxy_fdpass proxy_wstunnel proxy_ajp proxy_balancer proxy_express proxy_hcheck session session_cookie session_dbd slotmem_shm lbmethod_byrequests lbmethod_bytraffic lbmethod_bybusyness lbmethod_heartbeat unixd dav status autoindex info cgid dav_fs vhost_alias negotiation dir actions speling userdir alias rewrite
ENABLED_DSO_MODULES = ,authn_file,authn_core,authz_host,authz_groupfile,authz_user,authz_core,access_compat,auth_basic,reqtimeout,filter,mime,log_config,env,headers,setenvif,version,unixd,status,autoindex,dir,alias
LOAD_ALL_MODULES = no
APR_BINDIR = /usr/local/apr/bin
APR_INCLUDEDIR = /usr/local/apr/include/apr-1
APR_VERSION = 1.6.3
APR_CONFIG = /usr/local/apr/bin/apr-1-config
APU_BINDIR = /usr/local/apr-util/bin
APU_INCLUDEDIR = /usr/local/apr-util/include/apr-1
APU_VERSION = 1.6.1
APU_CONFIG = /usr/local/apr-util/bin/apu-1-config
APREQ_MAJOR_VERSION =
APREQ_LIBTOOL_VERSION =
