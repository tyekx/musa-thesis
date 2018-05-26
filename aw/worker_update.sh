for v in "$@"
do
	scp index.php worker@192.168.122.$v:/var/www/html/index.php 
done
