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
const appointmentBooking = require('./routes/bookAppointment.route')

const app = express()
app.use(express.json())
app.use(bodyParser.json())
// app.use(cors(origin = 'http://localhost:5173'))
app.use(cors(origin = process.env.DEPLOYMENT_FRONTEND_URL))

const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT
dbConnection()


app.use('/api', registerFacility)
app.use('/api/login', login)
app.use('/api/updates/facilityupdate', updateFacility)
app.use('/api/getfacilities', getFacilities)
app.use('/api/getfacilitybyid', getFacilityById)
app.use('/api', appointmentBooking)

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
