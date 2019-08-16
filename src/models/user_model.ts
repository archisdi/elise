export default function(sequelize: any, dataTypes: any): any {
    const member = sequelize.define(
        'User',
        {
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
        },
        {
            tableName: 'users',
            freezeTableName: true,
            underscored: true,
            paranoid: true /** Soft deletes */
        }
    );

    member.associate = (models: any): void => {
        // Member.belongsTo(models.model_name, {
        //     foreignKey: 'model_name_id',
        //     targetKey: 'id'
        // });
    };

    return member;
}
