const express = require ('express')
const bodyParser = require('body-parser')

const app = express()
const {User,Role,Session,Skill,Review} = require('./src/models/index');

const { PORT } = require('./src/config/serverConfig');
const APIRoutes = require('./src/routes');
const db = require('./src/models/index');


const errorHandlerMiddleware = (err, req, res, next) => {
    // Handle the error  
    res.json({
        nxtGenStatus : 1,
        error : err.stack,
        msg : err.message
    });
  };


const prepareAndStartServer = ()=>{
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true})); 
    app.use(APIRoutes);
    
    // error middleware after routes 
    app.use(errorHandlerMiddleware);
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
        // console.log(data[0].user_has_a_role)
        // await Session.create({
        //     user_id : 6,
        //     time : "2023-04-23T06:00:11.774Z",
        //     typeOfSession : 'n:m'
        // })


        // await Skill.create({
        //     name : "Ember.Js"
        // })
        // console.log(await User.findAll({}));
        // const EmberJs = await Skill.findAll({
        //     where : {
        //         id : 4
        //     }
        // })
        // const user = await User.findOne({
        //     where : {
        //         id : 3
        //     }
        //     ,
        //     include : [
        //     { 
        //         model :Skill,
        //         as : 'skills'

        //     }
        //     ]
        // })
        // user.addSkill(EmberJs);
        // console.log(user.skills[1].name);
        // await Review.create({
        //     userId : 3,
        //     reviewerId : 1,
        //     content : "great teacher"
        // })
    })
}

prepareAndStartServer();