const { User, validateUserSignIn } = require("../models/user");
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const { error } = validateUserSignIn(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password.");


    const validUserPassword = await bcrypt.compare(password, user.password);
    if (!validUserPassword) return res.status(400).send("Invalid email or password.");

    res.send(user.generateAuthToken()).status(200);
})


module.exports = router;



