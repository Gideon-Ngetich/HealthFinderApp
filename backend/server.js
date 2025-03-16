const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const dbConnection = require('./database/db.config')
const registerFacility = require("./routes/facilityRegistration.route")

const app = express()
app.use(express.json())
app.use(bodyParser.json())

const port = process.env.PORT
dbConnection()

app.use('/api/register-facility', registerFacility)

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
