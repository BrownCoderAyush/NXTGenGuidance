
const {User} = require('../models/index');
 
const UserService = require("../service/user.service");
const signUp =  async(req,res)=>{
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
            });

    } catch (err) {
        res.json({
            nxtGenStatus : 1,
            error : err.stack,
            msg : err.message
        })
    }
}

const getUser = async(req,res)=>{
    try {
        const userQueryParams = req.body;
        const user = await UserService.getUser(userQueryParams);
        res.status(200).json(
            { 
                nxtGenStatus : 0,
                user
            });

    } catch (error) {
        res.json({
            nxtGenStatus : 1,
            error : err.stack,
            msg : err.message
        })
    }
}

module.exports = {
    signUp,
    getUser
}