import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../../config/database';

console.log(config);

const basename = path.basename(__filename);
const db: any = {};
const sequelize = new Sequelize(config.table, config.username, config.password, config.options);

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
