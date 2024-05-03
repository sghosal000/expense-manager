const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const {
    createTransaction,
    getTransactions,
    deleteTransactionById,
} = require("../controllers/transaction.controller")

const transactionRouter = express.Router()

transactionRouter.post('/add', getUser, createTransaction)
transactionRouter.get('/', getUser, getTransactions)
transactionRouter.delete('/delete/:id', getUser, deleteTransactionById)

module.exports = transactionRouter