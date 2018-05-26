scp worker@192.168.122.110:/usr/local/apache2/logs/error_log error_log
./logcat < error_log
rm error_log
