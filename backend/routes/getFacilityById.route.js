const router = require('express').Router()
const { Facility } = require('../models/facility.model')

router.get('/', async (req, res) => {
    const { fid } = req.query;
    console.log(fid)
    try {
        const response = await Facility.findById(fid)

        if(!response) {
            return res.status(404).json({message: "Facility not found"})
        }

        res.status(200).json(response)
    } catch (err) {
        res.status(500).json({message: "Internal server error"})
    }
})

module.exports = router

