const {Role}=require("../models/index");
class RoleService{

    static async getRoleNameById(id){

        const role = await Role.findOne({
            where : {
                id : id
            }
        })
        return role;
    }
}

module.exports = RoleService;