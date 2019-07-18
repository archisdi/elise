green=`tput setaf 2`

cd ./database

../node_modules/.bin/sequelize db:migrate:undo:all
echo "\n ${green}Rollback Success"