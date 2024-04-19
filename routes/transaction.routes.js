const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const verifyRole = require("../middlewares/verifyRole.middleware")

const {
    createTransaction,
    getTransactions,
    getAllTransactions,
    getAllTransactionByUsername
} = require("../controllers/transaction.controller")

const transactionRouter = express.Router()

transactionRouter.get('/', getUser, getTransactions)
transactionRouter.post('/add', getUser, createTransaction)
transactionRouter.get('/all', verifyRole('admin'), getAllTransactions)
transactionRouter.get('/all/:username', verifyRole('admin'), getAllTransactionByUsername)

module.exports = transactionRouter