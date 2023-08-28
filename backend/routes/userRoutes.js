const express = require("express");
const { registerUser, loginUser } = require("../contollers/userController");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

module.exports = router;
