const router = require('express').Router()
const { Facility } = require('../models/facility.model')

router.get('/', async (req, res) => {
    try {
        const response = await Facility.find()

        res.status(200).json(response)
    } catch (err) {
        res.status(500).json("Internal server error")
    }
})

module.exports = router;