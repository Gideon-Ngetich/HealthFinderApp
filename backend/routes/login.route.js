const router = require('express').Router()
const { Facility } = require('../models/facility.model')
const bcrypt = require('bcryptjs')

router.post('/', async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    try {
        if(!email || !password ){
           return res.status(400).json("Email and password required")
        }

        const facility = await Facility.findOne({email})

        if(!facility) {
            return res.status(401).json("Facility not found")
        }

        const verifyPassword = await bcrypt.compare(password, facility.password)

        if(!verifyPassword) {
           return res.status(400).json("Invalid email or password")
        }

        res.status(200).json({message: "Login successfull", facility})
    } catch (err) {
        console.error(err)
        res.status(500).json("Internal server error")
    }
})

module.exports = router;