const router = require('express').Router()
const { Facility } = require('../models/facility.model')
const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
    try{ 
        const { facilityName, email, password, address, longitude, latitude, services, contacts, working_hours, medical_covers, images  } = req.body

        if (!facilityName || !longitude || !latitude || !address || !contacts) {
            return res.status(400).json({ message: "All required fields must be filled" });
          }

        const verifyEmail = await Facility.findOne({email})

        if(verifyEmail) {
            return res.status(400).json("Email already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const facility = new Facility({
            facilityName,
            email,
            password: hashedPassword,
            address,
            location: { type: "Point", coordinates: [longitude, latitude]},
            services,
            contacts,
            working_hours,
            medical_covers,
            images
        })

        await facility.save()

        res.status(201).json("Facility added successfully")

    } catch (err) {
        console.error(err)
        res.status(500).json("Internal server error")
    }
})

module.exports = router;
