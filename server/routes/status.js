const { Status, validateStatus } = require('../models/status');
const express = require('express');
const router = express.Router();


// * Get all status
router.get('/', async (req, res) => {
    const status = await Status.find().select("-__v");
    if (!status) res.status(404).send('Statuses cant be found at this moment');
    res.status(200).send(status);
})


// * Create a new status
router.post('/', async (req, res) => {
    // Validate request
    const { error } = validateStatus(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const status = new Status(req.body);
    await status.save()
    res.status(201).send(status)

})

module.exports = router