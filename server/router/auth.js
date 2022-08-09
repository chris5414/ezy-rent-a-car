const express = require("express");

const { login, register } = require("../controllers/auth.js");
const User = require("../models/User.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
