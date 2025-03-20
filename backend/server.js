const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const dbConnection = require('./database/db.config')
const registerFacility = require("./routes/facilityRegistration.route")
const login = require('./routes/login.route')
const updateFacility = require("./routes/facilityUpdate.route")
const getFacilities = require('./routes/getFacilities.route')
const getFacilityById = require('./routes/getFacilityById.route')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors(origin = 'http://localhost:5173'))

const port = process.env.PORT
dbConnection()

app.use('/api/register-facility', registerFacility)
app.use('/api/login', login)
app.use('/api/updates/facilityupdate', updateFacility)
app.use('/api/getfacilities', getFacilities)
app.use('/api/getfacilitybyid', getFacilityById)

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
