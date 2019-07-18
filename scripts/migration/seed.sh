green=`tput setaf 2`

cd ./database

../node_modules/.bin/sequelize db:seed:all

echo "\n ${green}Seeding Success"