const mongoose = require("mongoose");

const userCategorySchema = new mongoose.Schema({
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("userCategory", userCategorySchema)