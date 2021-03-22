const { User, validateUserRegister } = require('../models/user');
const { timeFormatFunc } = require('../common/timeFormatFunc');
const bcrypt = require("bcrypt");
const { pick } = require("lodash");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    // Validate request
    const { error } = validateUserRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // If user already exists
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exists");

    user = new User(req.body);
    user.joined = timeFormatFunc(new Date())

    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt())
    await user.save();

    res
        .header("x-auth-token", user.generateAuthToken())
        .header("access-control-expose-headers", "x-auth-token").status(201)
        .send(pick(user, ["_id", "name", "email"]));
})

module.exports = router;
