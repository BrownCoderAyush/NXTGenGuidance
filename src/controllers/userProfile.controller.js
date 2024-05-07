const RoleService = require("../service/role.service");
const UserService = require("../service/user.service");


const getUserProfile = async (req,res) => {
    const userId = req.params.userId;
    const user = await UserService.getUser({id: userId});
    const role = await RoleService.getRoleNameById(user.dataValues.roleId);
    return res.json({
        'picture': user.dataValues.picture,
        'username': user.dataValues.username,
        'role': role.dataValues.roleName
    });
}

const getMentorProfile = async (req, res) => {
    const userId = req.params.userId;
    const user = await UserService.getUser({id: userId});
    const role = await RoleService.getRoleNameById(user.dataValues.roleId);
    if(role.dataValues.roleName !== "Mentor") {
        res.status(400);
        return res.json({'error' : 'user is not a mentor'});
    }
    else {
        return res.json({
            'picture': user.dataValues.picture,
            'username': user.dataValues.username,
            'role': role.dataValues.roleName
        });
    }
}

module.exports = {
    getUserProfile,
    getMentorProfile
}