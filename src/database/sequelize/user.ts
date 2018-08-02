import bcrypt from 'bcryptjs';
import moment from 'moment';
import { Sequelize, DataTypes } from 'sequelize';

module.exports = function (sequelize: Sequelize, dataTypes: DataTypes) {
  const user = sequelize.define('User', {
    id: {
      type: dataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    uuid: {
      type: dataTypes.UUID,
      field: 'uuid',
      defaultValue: dataTypes.UUIDV4,
    },
    name: {
      type: dataTypes.STRING(255),
      allowNull: false,
      field: 'name',
    },
    username: {
      type: dataTypes.STRING(255),
      allowNull: false,
      unique: true,
      field: 'username',
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false,
      field: 'password',
    },
    refreshToken: {
      type: dataTypes.STRING(255),
      allowNull: true,
      field: 'refresh_token',
    },
    tokenValidity: {
      type: dataTypes.DATE,
      allowNull: true,
      field: 'token_validity',
    },
    createdAt: {
      type: dataTypes.DATE,
      allowNull: true,
      field: 'created_at',
    },
    updatedAt: {
      type: dataTypes.DATE,
      allowNull: true,
      field: 'updated_at',
    },
  },                            { tableName: 'users' });

  user.associate = (models) => {
        // User.belongsTo(models.model_name, {
        //     foreignKey: 'model_name_id',
        //     targetKey: 'id'
        // });
  };

  return user;
};
