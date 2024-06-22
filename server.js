const express = require ('express')
const bodyParser = require('body-parser')

const app = express()

const { PORT } = require('./src/config/serverConfig');
const APIRoutes = require('./src/routes');
const db = require('./src/models/index');
const expressLogger = require('./src/config/logger');


const {User,Role,Session,Skill,Review} = require('./src/models/index');
const SessionService = require('./src/service/session.service');


const errorHandlerMiddleware = (err, req, res, next) => {
    // Handle the error  
    console.log(err);
    res.json({
        nxtGenStatus : 1,
        error : err.stack,
        msg : err.message
    });
};


const prepareAndStartServer = ()=>{
    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({extended:true})); 

    app.use(expressLogger);
  
    app.use(APIRoutes);

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        next();
    });
    
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
        // new Date(year,month,day,hours,minutes,seconds,ms)
        // try {
        //     const f = (new Date("Fri, 10 May 2024 16:11:51 GMT")).toUTCString();
        //     SessionService.getSession({
        //         status : "Pending",
        //         from : f,
        //         // to : 'bbb'
        //     })
        //     // console.log(f.toString(), f.getFullYear(),f.getMonth(),f.getDate());
        //     // console.log(f);
            
        // } catch (error) {
        //     console.log(error);
        // }
        // const now = moment(new Date());
        // const finaltime = moment(new Date()).add(7,'d').utc();
        // console.log(finaltime.toLocaleTimeString(),'local');
        // .set({ hour: now.hours(), minute: now.minutes(), second: now.seconds(), millisecond: now.milliseconds()});
        // console.log(finaltime);
        // console.log(await Session.create({
        //     user_id : 6,
        //     time : moment(new Date()).add(18,'d').add(1,'M').utc(),
        //     typeOfSession : '1-1'
        // }))
        // // console.log(moment().format());
        // const result = await SessionService.getSession({
        //     type : '1-1',     
        //     from : moment(new Date()).utc(),
        //     user_id : 6 , 
        //     till : moment(new Date()).add(10,'d').utc()
        // })
        // console.log(result);
        // console.log(moment('24-12-2019 06:00:11', "DD-MM-YYYY hh:mm:ss").utc());
    })
}

prepareAndStartServer();