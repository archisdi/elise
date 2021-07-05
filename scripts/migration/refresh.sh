green=`tput setaf 2`

cd ./database

sequelize-cli db:migrate:undo:all
echo "\n ${green}Rollback Success"

sequelize db:migrate
echo "\n ${green}Migrating Success"

if [[ $1 == "seed" ]]; then
        sequelize-cli db:seed:all
        echo "\n ${green}Seeding Success"
fi
