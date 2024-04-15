const mongoose = require('mongoose');

const recurringTransactionSchema = new mongoose.Schema({
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
        enum: ['income', 'expense', 'investment'],
        required: true
    },
    categoryId: {  // reference to category by id, not a separate object
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    frequency: {
        interval: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            enum: ['days', 'weeks', 'months', 'years'],
            required: true
        }
    },
    note: {
        type: String
    },
    nextExecutionDate: {
        type: Date,
        required: true
    }
},
{
    timestamps: true,
    index: {
        userid: 1,
        type: 1
    }
});

module.exports = mongoose.model('recurringTransaction', recurringTransactionSchema);
