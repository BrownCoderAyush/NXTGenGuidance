const express = require ('express')
const bodyParser = require('body-parser')

const db = require('./src/models/index')
const app = express()
const {User,Role} = require('./src/models/index');

const { PORT } = require('./src/config/serverConfig')
const APIRoutes = require('./src/routes');
const { where } = require('sequelize');


const prepareAndStartServer = ()=>{
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true})); 
    app.use(APIRoutes);
    
    db.sequelize.sync({alter:true});


    app.listen(PORT ,async ()=>{
    console.log(`Server Started on Port : ${PORT}`);
    // console.log(await User.create({username : "aaapien", email : "ayushaa@gmail.com", password : "aalaa" , roleId : 4 , mobilenumber:["1234567890","2345678912","23"]}));
        // console.log(await Role.bulkCreate([{roleName : "Admin"},{roleName : "Mentor"},{roleName : "Mentee"}]));
        // await Role.destroy({
        //     where : {
        //         id : 5
        //     }
        // })
        // const data = await User.findAll({
        //     include:{model : Role , as:'user_has_a_role' }
        // });
        // console.log(data[0].user_has_a_role.id)
    })
}

prepareAndStartServer();