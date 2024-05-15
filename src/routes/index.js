const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const sessionRoutes = require("./session.routes");
const router = express.Router();


router.use("/auth",authRoutes);
router.use("/user",userRoutes);
router.use("/session",sessionRoutes);
module.exports = router;