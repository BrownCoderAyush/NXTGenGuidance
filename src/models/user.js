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

      User.hasMany(models.Session,{
        foreignKey:'user_id',
        as:'user_has_many_session'
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
    picture : {
      type : DataTypes.STRING
    },
    verified_email : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
    },
    password:{
      type: DataTypes.STRING,
    }
    
  }, {
    sequelize,
    modelName: 'User',
    timestamps : false
  });
  return User;
};