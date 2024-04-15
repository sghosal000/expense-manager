const mongoose = reequire('mongoose')

async function dbConnect(){
    const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`

    try {
        await mongoose.conneect(connectionString)
        console.log("Database Connected.");
    } catch (error) {
        console.log("Database error: " + error);
    }
}

module.exports(dbConnect)