'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const {ServerConfig} = require('../config');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through : 'User_Roles',
        as : 'role'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      validate : {
        isEmail : true
      },
      allowNull : false,
      unique  : true
    },
    name: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        len : [3,50]
      }
    }
    
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => {
    const PlaintextPassword = user.password;
    const hash = bcrypt.hashSync(PlaintextPassword, +ServerConfig.SALTROUNDS);
    user.password = hash;
  });
  return User;
};