'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.User,{
        foreignKey : 'userId',
        onDelete : 'CASCADE',
      })
      Review.belongsTo(models.User,{
        foreignKey : 'reviewerId',
        onDelete : 'CASCADE',
      })
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    reviewerId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};