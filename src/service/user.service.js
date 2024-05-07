const {User}=require("../models/index");
class UserService{

    static async getUser(queryParams){

        const user = await User.findOne({
            where : queryParams
        })
        return user;
    }

    static async createUser(userData){
        const user = await User.create(userData);
        return user;
    }

}

module.exports = UserService;