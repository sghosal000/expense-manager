const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    fname: {
        type: String,
        required: [true, "first name is required"]
    },
    lname: {
        type: String,
    },
    age: {
        type: Number
    },
    maritalstatus: {
        type: Boolean
    },
    usercategories: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
        }],
        default: []
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'normal'],
        default: 'normal'
    }
},
    {
        timestamps: true,
        index: { role: 1 }
    })

module.exports = mongoose.model("User", userSchema)