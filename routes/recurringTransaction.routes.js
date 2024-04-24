const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const verifyRole = require("../middlewares/verifyRole.middleware")
const {
    createRecurringTransaction,
    getRecurringTransactions,
    getAllRecurringTransactions,
    getAllRecurringTransactionsByUsername,
    deleteRecurringTransactionById,
    deleteRecurringTransactionByIdAdmin
} = require("../controllers/recurringTransaction.controller")

const recurringTransactionRouter = express.Router()

recurringTransactionRouter.post('/add', getUser, createRecurringTransaction)
recurringTransactionRouter.get('/', getUser, getRecurringTransactions)
recurringTransactionRouter.get('/all', verifyRole('admin'), getAllRecurringTransactions)
recurringTransactionRouter.get('/all/:username', verifyRole('admin'), getAllRecurringTransactionsByUsername)
recurringTransactionRouter.delete('/delete/:id', getUser, deleteRecurringTransactionById)
recurringTransactionRouter.delete('/remove/:id', verifyRole('admin'), deleteRecurringTransactionByIdAdmin)

module.exports = recurringTransactionRouter