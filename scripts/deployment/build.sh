echo "\n Building..."

rm -rf build
tsc
cp -a ./node_modules ./build
cp .env ./build/src