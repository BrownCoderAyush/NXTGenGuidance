const devLogger = require("../config/devLogger");
const {User,Role}=require("../models/index");
class UserService{

    static async getUser(queryParams){

        const user = await User.findOne({
            where: queryParams,
            raw: true // This option returns plain JSON objects instead of Sequelize model instances
        });
        console.log(user);
        devLogger().info(`data ${user}`);
        return user;
    }

    static async createUser(userData){
        const user = await User.create(userData);
        return user;
    }

}

module.exports = UserService;