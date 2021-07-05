const tableOptions = 'quotes';

module.exports = {
    up:(queryInterface, DataTypes) => queryInterface.createTable(tableOptions, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        author: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }),
    down: (queryInterface, DataTypes) => queryInterface.dropTable(tableOptions)
}