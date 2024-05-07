'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Skill.belongsToMany(models.User, {
        foreignKey: 'skillId',
        through: 'Userroles',
        as: 'users' 
     });
    
    }
  }
  Skill.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Skill',
    timestamps : false
  });
  return Skill;
};