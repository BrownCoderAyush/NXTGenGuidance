'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Session.belongsTo(models.User,{
        foreignKey : 'user_id',
        onDelete :'CASCADE',
        as:'user_has_a_session'
      })
    }
  }
  Session.init({
    user_id: {     
      type : DataTypes.INTEGER ,
    },
    startTime:{
      type : DataTypes.DATE,
      allowNull : false
    },
    endTime:{
      type : DataTypes.DATE,
      allowNull : false
    },
    price:{
      type : DataTypes.INTEGER,
      allowNull : false,
      defaultValue : 0 
    },
    typeOfSession : {
      type : DataTypes.ENUM("1-1","1-m","n:m"),
      defaultValue : "1-1",
      allowNull : false
    },
    status:{
      type : DataTypes.ENUM('Pending','Completed'),
      defaultValue : 'Pending',
      // allowNull : false
    }

  }, {
    sequelize,
    modelName: 'Session',
    timestamps : false 
  });
  return Session;
};