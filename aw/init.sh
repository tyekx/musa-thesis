./proxy_config.sh "$@" > proxy.conf 
virsh start proxy
virsh start worker1
virsh start worker2
virsh start worker3

sleep 20

./update.sh
