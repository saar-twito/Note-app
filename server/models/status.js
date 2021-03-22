const mongoose = require('mongoose');
const Joi = require('joi');


const Status = mongoose.model('Status', new mongoose.Schema({
    status: {
        type: String,
        min: 3,
        max: 15,
        unique: true,
        trim: true
    }
}))


function validateStatus(status) {
    const schema = {
        status: Joi.string().max(15).min(3).trim()
    }

    return Joi.validate(status, schema)
}

module.exports = {
    Status,
    validateStatus
};
