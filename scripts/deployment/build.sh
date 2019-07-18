echo "\n Building..."

rm -rf build
tsc
cp -a ./node_modules ./build
cp -a ./storage ./build/storage
cp .env ./build