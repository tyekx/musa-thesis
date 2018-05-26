
#usage: proxy_config.sh LBMETHOD C ip_ends
echo "ProxyRequests off"
echo "<Proxy balancer://lbtest>"
for ipn in "${@:3}"
do
	echo "    BalancerMember http://192.168.122.$ipn:80"
done
echo "    ProxySet lbmethod=$1"
echo "</Proxy>"

echo "<Location /balancer-manager>"
echo "    SetHandler balancer-manager"
echo "</Location>"

echo "ProxyPreserveHost On"

echo "ProxyPass /balancer-manager !"
echo "ProxyPass / balancer://lbtest/"

echo "AiRequestDatabaseCapacity 16"
echo "AiWorkerCount 3"
echo "AiCorrectionFactor $2"

echo -e "\n"
