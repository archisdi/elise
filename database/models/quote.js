const model = (dataTypes) => ({
    id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    author: {
        type: dataTypes.STRING(255),
        allowNull: false
    },
    text: {
        type: dataTypes.TEXT,
        allowNull: false,
    },
    year: {
        type: dataTypes.INTEGER,
        allowNull: true,
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
});

const options = {
    tableName: 'quotes',
    freezeTableName: true,
    underscored: true,
    paranoid: true /** Soft deletes */
}

module.exports = {
    options,
    model,
    default: function (sequelize, dataTypes) {
        const quote = sequelize.define('Quote', model(dataTypes), options);
        quote.associate = (models) => {
        };
        return quote;
    }
}
