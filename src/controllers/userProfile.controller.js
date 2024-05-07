const e = require("express");
const ReviewService = require("../service/review.service");
const RoleService = require("../service/role.service");
const UserService = require("../service/user.service");


const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUser({ id: userId });
        const role = await RoleService.getRoleNameById(user.dataValues.roleId);
        return res.json({
            nxtGenStatus: 0,
            picture: user.dataValues.picture,
            username: user.dataValues.username,
            role: role.dataValues.roleName
        });
    } catch (err) {
        res.json({
            nxtGenStatus: 1,
            error: err.stack,
            msg: err.message
        })
    }
}

const getMentorProfile = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await UserService.getUser({ id: userId });
        const role = await RoleService.getRoleNameById(user.dataValues.roleId);
        // if (role.dataValues.roleName !== "Mentor") {
        //     res.status(400);
        //     //need to discuss what to send here instead of this json
        //     //if the requested user is not a mentor
        //     return res.json({ 'error': 'user is not a mentor' });
        // }
        // else {
        const reviews = await ReviewService.getReviewsMentor(userId)
        const reviewData = new Array();
        for (const x of reviews) {
            const userData = await getUserDetails(x.dataValues.userId);
            const reviewerData = await getUserDetails(x.dataValues.reviewerId);
            reviewData.push({
                id: x.dataValues.id,
                user: userData,
                reviewer: reviewerData,
                content: x.dataValues.content,
                createdAt: x.dataValues.createdAt
            });
        }
        console.log(reviewData);
        // console.log(reviews);
        return res.json({
            nxtGenStatus: 0,
            picture: user.dataValues.picture,
            username: user.dataValues.username,
            role: role.dataValues.roleName,
            reviews: reviewData
        });
        // }
    } catch (err) {
        res.json({
            nxtGenStatus: 1,
            error: err.stack,
            msg: err.message
        })
    }
}

const getUserDetails = async (id) => {
    const user = await UserService.getUser({
        id: id
    });
    return {
        username: user.dataValues.username,
        picture: user.dataValues.picture
    };
}

module.exports = {
    getUserProfile,
    getMentorProfile
}