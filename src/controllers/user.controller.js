
const {User} = require('../models/index');
 
const UserService = require("../service/user.service");
const signUp =  async(req,res,next)=>{
    try {
        const {username,password,email,verified_email,picture} = req.body;
    

        const user = await UserService.createUser({
                username,
                password,
                email,
                verified_email,
                picture,
                roleId : 3
        })
        res.status(200).json(
            { 
                nxtGenStatus : 0,
                user
            }
    );
    } catch (err) {
        console.log(err);
        next(err);
    }
}

const getUser = async(req,res,next)=>{
    try {
        const userQueryParams = req.body;
        const user = await UserService.getUser(userQueryParams);
        res.status(200).json(
            { 
                nxtGenStatus : 0,
                user
            });

    } catch (err) {
        next(err);
    }
}


module.exports = {
    signUp,
    getUser
}