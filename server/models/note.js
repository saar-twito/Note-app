const mongoose = require('mongoose');
const Joi = require('joi');


const noteSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
        maxLength: 20,
        required: true,
    },
    note: {
        type: String,
        maxLength: 250,
        required: true,
    },
    date: {
        type: String,
    }
})

const validateNote = (noteObject) => {
    const schema = {
        status: Joi.string().required(),
        topic: Joi.string().max(20).required(),
        note: Joi.string().max(250).required(),
    }
    return Joi.validate(noteObject, schema);
}

const validateNoteId = (noteId) => mongoose.Types.ObjectId.isValid(noteId);


module.exports = {
    validateNote,
    validateNoteId,
    noteSchema
};
