echo "Started building..."
echo "Entering httpd directory..."

pushd ~/work/webs/httpd

echo "Building..."

make

if [ $? -eq 0 ]
then 
	echo "Build successful..."
else
	echo "Build failed..."
	exit 1
fi

echo "Installing..."

make install

if [ $? -eq 0 ]
then
	echo "Installation successful..."
else
	echo "Installation failed..."
	exit 1
fi

echo "Exiting..."

cp ~/work/webs/aw/httpd.conf /usr/local/apache2/conf/httpd.conf

popd



