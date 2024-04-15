const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        enum: ["income", "expense", "investment"],
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("category", categorySchema)