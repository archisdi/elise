import bcrypt from 'bcryptjs';
import moment from 'moment';
import { Sequelize, DataTypes} from 'sequelize';

module.exports = function (sequelize: Sequelize, DataTypes: DataTypes) {
    const Member = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
        },
        uuid: {
            type: DataTypes.UUID,
            field: 'uuid',
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'name'
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            field: 'username'
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'password'
        },
        refreshToken: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'refresh_token'
        },
        tokenValidity: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'token_validity'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at'
        }
    }, {
        tableName: 'users'
    });

    // Member.associate = (models) => {
    //     Member.belongsTo(models.model_name, {
    //         foreignKey: 'model_name_id',
    //         targetKey: 'id'
    //     });
    // };

    // Member.prototype.validateAuth = function (password: string) {
    //     return bcrypt.compareSync(password, this.password);
    // };

    // Member.prototype.validateRefresh = function (password: string) {
    //     return moment() < moment(this.tokenValidity);
    // };

    return Member;
};
