const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const {
    createRecurringTransaction,
    getRecurringTransactions,
    deleteRecurringTransactionById,
} = require("../controllers/recurringTransaction.controller")

const recurringTransactionRouter = express.Router()
recurringTransactionRouter.use(getUser())

recurringTransactionRouter.post('/add', createRecurringTransaction)
recurringTransactionRouter.get('/', getRecurringTransactions)
recurringTransactionRouter.delete('/delete/:id', deleteRecurringTransactionById)

module.exports = recurringTransactionRouter