green=`tput setaf 2`

cd ./database

sequelize-cli db:seed:all

echo "\n ${green}Seeding Success"