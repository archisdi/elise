const model = (dataTypes) => ({
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
    clearance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5
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
});

const options = {
    tableName: 'users',
    freezeTableName: true,
    underscored: true,
    paranoid: true /** Soft deletes */
};

module.exports = {
    options,
    model,
    default: function (sequelize, dataTypes) {
        const member = sequelize.define( 'User', model(dataTypes), options);
        member.associate = (models) => {
            // member.hasMany(models.Post, {
            //     sourceKey: 'id',
            //     targetKey: 'author_id'
            // });
        };
        return member;
    }
}
