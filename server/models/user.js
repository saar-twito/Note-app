const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { noteSchema } = require('./note');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 25,
        lowercase: true,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        maxLength: 250,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        maxLength: 1024,
        minLength: 5,
        required: true,
    },
    notes: {
        type: [noteSchema]
    },
    joined: {
        type: String,
    }
})

userSchema.methods.generateAuthToken = function () {
    return token = jwt.sign(
        {
            id: this._id,
            name: this.name,
            email: this.email,
        },
        process.env.JWT_PRIVATE_KEY, { expiresIn: '3 days', })
}

const User = mongoose.model('User', userSchema);



const validateUserRegister = (user) => {
    const schema = {
        name: Joi.string().max(25).lowercase().trim().required(),
        email: Joi.string().max(250).lowercase().trim().email().required(),
        password: Joi.string().min(5).max(255).required(),
    }
    return Joi.validate(user, schema);
}


const validateUserSignIn = (user) => {
    const schema = {
        email: Joi.string().max(250).lowercase().trim().required(),
        password: Joi.string().min(5).max(250).required(),
    }
    return Joi.validate(user, schema);
}


module.exports = {
    User,
    validateUserRegister,
    validateUserSignIn,
    userSchema
};
