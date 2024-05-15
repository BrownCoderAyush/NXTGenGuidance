
const {User} = require('../models/index');
const AuthService = require('../service/auth.service');
 
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
        const authToken = req.headers.authorization.replace("Bearer ", "");
        const user = AuthService.verifyToken(authToken);
        return res.json(user);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    signUp,
    getUser
}