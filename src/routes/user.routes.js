const express = require("express");
const { signUp , getUser } = require("../controllers/user.controller");
const {getUserProfile, getMentorProfile} = require("../controllers/userProfile.controller")


const router = express.Router();


router.post('/signup',signUp);
router.get('/getUser',getUser);
router.get('/:userId', getUserProfile);
router.get('/mentor/:userId', getMentorProfile);

module.exports = router;