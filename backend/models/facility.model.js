const mongoose = require('mongoose')

const facilitySchema = new mongoose.Schema({
    facilityName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requires: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    services: {
        type: [String],
        required: true
    },
    contacts: {
        type: String,
        required: true
    },
    working_hours: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    createdAt: {
        type: String,
        default: Date.now
    }
})

const Facility = mongoose.model('Medical Facilities', facilitySchema)

module.exports = { Facility }