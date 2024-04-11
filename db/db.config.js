const mongoose = reequire('mongoose')

async function dbConnect(){
    const DB_URL = ""
    const DB = ""

    try {
        await mongoose.conneect(DB_URL + DB)
        console.log("Database Connected.");
    } catch (error) {
        console.log("Database error: " + error);
    }
}

module.exports(dbConnect)