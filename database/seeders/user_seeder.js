const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const names = ['admin', 'archisdi'];

        const users = names.map(item => ({
            name: item,
            id: uuid(),
            username: item,
            password: bcrypt.hashSync(item, 8),
            created_at: new Date(),
            updated_at: new Date()
        }));

        return queryInterface.bulkInsert('users', users, {});
    },
    down: (queryInterface, Sequelize) => { }
};
