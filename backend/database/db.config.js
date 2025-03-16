const mongoose = require('mongoose')

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to DB")
})
.catch((err) => {
    console.log("Error connected to db", err)
})
}

module.exports = dbConnection