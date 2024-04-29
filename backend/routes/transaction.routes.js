const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const verifyRole = require("../middlewares/verifyRole.middleware")
const {
    createTransaction,
    getTransactions,
    getAllTransactions,
    getAllTransactionByUsername,
    deleteTransactionById,
    deleteTransactionByIdAdmin
} = require("../controllers/transaction.controller")

const transactionRouter = express.Router()

transactionRouter.post('/add', getUser, createTransaction)
transactionRouter.get('/', getUser, getTransactions)
transactionRouter.get('/all', verifyRole('admin'), getAllTransactions)
transactionRouter.get('/all/:username', verifyRole('admin'), getAllTransactionByUsername)
transactionRouter.delete('/delete/:id', getUser, deleteTransactionById)
transactionRouter.delete('/remove/:id', verifyRole('admin'), deleteTransactionByIdAdmin)

module.exports = transactionRouter