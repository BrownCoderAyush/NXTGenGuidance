'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references : {
          model : 'Users',
          key : 'id',
          as : 'user_id'
        }
      },
      startTime: {
        type: Sequelize.DATE,
        allowNull : false
      },
      endTime: {
        type: Sequelize.DATE,
        allowNull : false
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
      },
      typeOfSession : {
        type : Sequelize.ENUM("1-1","1-m","n:m"),
        default : "1-1",
        allowNull : false
      },
      status : {
        type : Sequelize.ENUM('Pending','Completed'),
        defaultValue : 'Pending',
        // allowNull : false
      }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sessions');
  }
};