const model = (dataTypes) => ({
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
});

const options = {
    tableName: 'posts',
    freezeTableName: true,
    underscored: true,
    paranoid: true /** Soft deletes */
}

module.exports = {
    options,
    model,
    default: function (sequelize, dataTypes) {
        const post = sequelize.define('Post', model(dataTypes), options);
        post.associate = (models) => {
            // post.belongsTo(models.User, {
            //     foreignKey: 'author_id',
            //     targetKey: 'id'
            // });
        };
        return post;
    }
}
