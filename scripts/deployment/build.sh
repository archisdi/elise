echo "\n Building..."

rm -rf build
npm run lint
tsc
cp -a ./node_modules ./build
cp -a ./storage ./build/storage
cp .env ./build