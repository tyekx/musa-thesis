curl -s -G http://192.168.0.227:8080/balancer-manager > /c/work/webs/aw/curl_temp.txt

TESTL=`cat /c/work/webs/aw/curl_temp.txt | awk -F "</td><td>" '/Init Ok/ {printf $7 " "}'`

echo " $TESTL" >> "$1"
