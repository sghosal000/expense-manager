const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        validate: {
            validator: (amount) => amount > 0,
            message: "amount should be positive decimal value."
        }
    },
    note: {
        type: String,
    },
    type: {
        type: String,
        enum: ["income", "expense", "investment"],
        required: true
    },
    categoryid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    recurringid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recurringTransaction',
    }
},
{
    timestamps: true,
    index: {
        userid: 1,
        type: 1
    }
})

module.exports = mongoose.model("Transaction", transactionSchema)