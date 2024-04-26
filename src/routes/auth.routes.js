const express = require("express");
const { authInitializer, authCallback, logout } = require("../controllers/OAuth.controller");


const router = express.Router();


router.get('/google',authInitializer);
router.get('/google-callback',authCallback);
router.get('/logout',logout);


module.exports = router;