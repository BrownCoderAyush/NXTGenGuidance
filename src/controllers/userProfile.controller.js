const e = require("express");
const ReviewService = require("../service/review.service");
const RoleService = require("../service/role.service");
const UserService = require("../service/user.service");


const getUserProfile = async (req,res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUser({id: userId});
        const role = await RoleService.getRoleNameById(user.dataValues.roleId);
        return res.json({
            nxtGenStatus : 0,
            picture: user.dataValues.picture,
            username: user.dataValues.username,
            role: role.dataValues.roleName
        });
    } catch (err) {
        res.json({
            nxtGenStatus : 1,
            error : err.stack,
            msg : err.message
        })
    }
}

const getMentorProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUser({id: userId});
        const role = await RoleService.getRoleNameById(user.dataValues.roleId);
        if(role.dataValues.roleName !== "Mentor") {
            res.status(400);
            //need to discuss what to send here instead of this json
            //if the requested user is not a mentor
            return res.json({'error' : 'user is not a mentor'});
        }
        else {
            const reviews = await ReviewService.getReviewsMentor(userId)
            console.log(reviews);
            return res.json({
                nxtGenStatus : 0,
                picture: user.dataValues.picture,
                username: user.dataValues.username,
                role: role.dataValues.roleName,
                reviews: reviews.map(x => x.dataValues)
            });
        }
    } catch (err) {
        res.json({
            nxtGenStatus : 1,
            error : err.stack,
            msg : err.message
        })
    }
}

module.exports = {
    getUserProfile,
    getMentorProfile
}