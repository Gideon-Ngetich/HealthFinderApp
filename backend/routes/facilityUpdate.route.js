const router = require('express').Router()
const { Facility } = require('../models/facility.model')
const bcrypt = require('bcryptjs')

router.put('/', async (req, res) => {
    const { id } = req.query
    const updates = req.body

    try {
        const updateFacility = await Facility.findByIdAndUpdate(id, updates, {new: true})

        if(!updateFacility) {
            return res.status(404).json({ message: "Facility not found"})
        }

        res.status(200).json({message: "Facility updated successfully", facility: updateFacility})
    } catch (err) {
        res.status(500).json({message: "Intenal server error"})
    }
})

module.exports = router;