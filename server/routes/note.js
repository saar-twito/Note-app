const { validateNote, validateNoteId } = require('../models/note');
const { User } = require('../models/user');
const authorization = require('../middleware/authorization');
const express = require('express');
const router = express.Router();


router.get('/', [authorization], async (req, res) => {
    // Fine user 
    const user = await User.findOne({ email: req.user.email });
    res.status(200).send(user.notes);
})


router.post('/', [authorization], async (req, res) => {
    // validate request
    const { error } = validateNote(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Find user
    const user = await User.findOne({ email: req.user.email });
    // Add note
    const note = req.body
    const date = new Date();
    note.date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    const lastNote = user.notes.push(note)
    // Save user
    await user.save()
    res.status(201).send(user.notes[lastNote - 1]);
})




router.delete('/:id', [authorization], async (req, res) => {
    // Validate Id
    if (!validateNoteId(req.params.id)) return res.status(400).send("Invalid ID");
    // Fine user
    const user = await User.findOne({ email: req.user.email });
    // Find note index
    const index = user.notes.findIndex(item => item.id === req.params.id);
    if (index === -1) return res.status(400).send("Note was already been deleted");
    // Remove note
    user.notes.splice(index, 1);
    // Save user
    await user.save();
    res.status(200).send();
})

module.exports = router;














