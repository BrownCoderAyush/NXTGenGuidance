'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique:true
      }
      ,
      mobilenumber : {
        type : Sequelize.ARRAY(Sequelize.STRING(10)),
        // validate:{
        //   len:{
        //     args : [10,10],
        //     msg :"Length of phone number is greater than 10"
        //   }
        // }
      },
      picture : {
        type : Sequelize.STRING,
      },
      verified_email : {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
      },
      roleId:{
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references: {
          model : 'Roles',
          key : 'id',
          as:'roleId'
        }, 
        allowNull : false
      },
      password:{
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique:true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};