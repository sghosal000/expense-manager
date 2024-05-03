const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const {
    createRecurringTransaction,
    getRecurringTransactions,
    deleteRecurringTransactionById,
} = require("../controllers/recurringTransaction.controller")

const recurringTransactionRouter = express.Router()

recurringTransactionRouter.post('/add', getUser, createRecurringTransaction)
recurringTransactionRouter.get('/', getUser, getRecurringTransactions)
recurringTransactionRouter.delete('/delete/:id', getUser, deleteRecurringTransactionById)

module.exports = recurringTransactionRouter