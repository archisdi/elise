'use strict';

const tableName = 'posts';

module.exports = {
    up: (queryInterface, dataTypes) => queryInterface.createTable(tableName, {
        id: {
            type: dataTypes.UUID,
            defaultValue: dataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        author_id: {
            type: dataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        content: {
            type: dataTypes.TEXT,
            allowNull: false,
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
