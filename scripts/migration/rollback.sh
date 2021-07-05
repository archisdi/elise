green=`tput setaf 2`

cd ./database

sequelize-cli db:migrate:undo:all
echo "\n ${green}Rollback Success"