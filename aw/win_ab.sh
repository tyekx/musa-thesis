"C:\xampp\apache\bin\ab.exe" -n $1 -c $2 -l -d $3 > /c/work/webs/aw/ab_temp.txt

RPS=`cat /c/work/webs/aw/ab_temp.txt | awk -F " " '/Requests per second/ {print $4}'`
MEANSD=`cat /c/work/webs/aw/ab_temp.txt | awk -F " " '/Total:/ {print $3 " " $4}'`

curl -s -G http://192.168.0.227:8080/balancer-manager > /c/work/webs/aw/curl_temp.txt

TESTL=`cat /c/work/webs/aw/curl_temp.txt | awk -F "</td><td>" '/Init Ok/ {printf $7 " "}'`

echo "$RPS $MEANSD $TESTL" > "$4"

rm /c/work/webs/aw/curl_temp.txt
rm /c/work/webs/aw/ab_temp.txt
