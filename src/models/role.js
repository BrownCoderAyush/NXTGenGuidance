'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User,{
        foreignKey:'roleId',
        as:'role_has_many_user'
      })
    }
  }
  Role.init({
    roleName: {
      type :DataTypes.ENUM("Admin","Mentor","Mentee"),
      allowNull:false
    },
    
  }, {
    sequelize,
    modelName: 'Role',
    timestamps : false
  });
  return Role;
};