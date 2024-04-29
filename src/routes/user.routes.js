const express = require("express");
const { signUp , getUser } = require("../controllers/user.controller");


const router = express.Router();


router.post('/signup',signUp);
router.get('/getUser',getUser);


module.exports = router;    