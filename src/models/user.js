'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role,{
        foreignKey : 'roleId',
        onDelete :'CASCADE',
        as:'user_has_a_role'
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique:true
    },
    roleId:{
      type: DataTypes.INTEGER,
    },
    email:  {
      type: DataTypes.STRING,
      unique:true,
      validate:{
        isEmail:true
      }
    },
    mobilenumber : {
        type : DataTypes.ARRAY(DataTypes.STRING(10)),

    },
    password:{
      type: DataTypes.STRING,
      allowNull:false
    }
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};