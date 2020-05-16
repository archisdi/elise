module.exports = function (sequelize, dataTypes) {
    const post = sequelize.define(
        'Post',
        {
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
        },
        {
            tableName: 'posts',
            freezeTableName: true,
            underscored: true,
            paranoid: true /** Soft deletes */
        }
    );

    post.associate = (models) => {
        // post.belongsTo(models.User, {
        //     foreignKey: 'author_id',
        //     targetKey: 'id'
        // });
    };

    return post;
}
