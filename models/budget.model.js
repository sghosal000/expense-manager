const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
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
    type: {
        type: String,
        enum: ['expense', 'investment'],
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
        // get: function () {
        //     const month = this.startDate.getMonth();
        //     const year = this.startDate.getFullYear();
        //     const lastDay = new Date(year, month + 1, 0); // Get last day of the month
        //     return lastDay;
        // }
    }
},
{
    timestamps: true,
    index: {
        userid: 1,
        type: 1
    }
})

module.exports = mongoose.model("budget", budgetSchema)