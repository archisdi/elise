green=`tput setaf 2`

cd ./database

../node_modules/.bin/sequelize db:migrate
echo "\n ${green}Migrating Success"

if [[ $1 == "seed" ]]; then
        ../node_modules/.bin/sequelize db:seed:all
        echo "\n ${green}Seeding Success"
fi
