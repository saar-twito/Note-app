const { User, validateUserSignIn, validateUserRegister } = require("../models/user");
const bcrypt = require('bcrypt');
const { timeOfAnAction } = require('../common/timeOfAnAction');
const { pick } = require("lodash");
const express = require('express');
const router = express.Router();


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const { error } = validateUserSignIn(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");


    const validUserPassword = await bcrypt.compare(password, user.password);
    if (!validUserPassword) return res.status(400).send("Invalid email or password.");

    res.send(user.generateAuthToken()).status(200);
})




router.post('/register', async (req, res) => {

    // Validate request
    const { error } = validateUserRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // If user already exists
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send("User already exists");

    // Create a user
    user = new User(req.body);
    user.joined = timeOfAnAction(new Date())

    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt())
    await user.save();

    res
        .header("x-auth-token", user.generateAuthToken())
        .header("access-control-expose-headers", "x-auth-token").status(201)
        .send(pick(user, ["_id", "name", "email"]));
})


module.exports = router;



