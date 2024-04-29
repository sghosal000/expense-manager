const mongoose = require('mongoose')
require('dotenv').config()

async function dbConnect(){
    const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
    // const connectionString = process.env.DB_CONNECTION

    try {
        await mongoose.connect(connectionString)
        console.log("Database Connected.");
    } catch (error) {
        console.log("Database error: " + error);
    }
}

module.exports = dbConnect