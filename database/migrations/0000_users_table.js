'use strict';

const tableName = 'users';

module.exports = {
    up: (queryInterface, dataTypes) => queryInterface.createTable(tableName, {
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        username: {
            type: dataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        refresh_token: {
            type: dataTypes.STRING(255),
            allowNull: true
        },
        token_validity: {
            type: dataTypes.DATE,
            allowNull: true
        },
        created_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: dataTypes.DATE,
            allowNull: true
        }
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable(tableName)
};
