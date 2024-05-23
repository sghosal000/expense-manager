const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const {
    createTransaction,
    getTransactions,
    getDailyTransactions,
    getTotalofMonth,
    getTransactionsCategoryWise,
    deleteTransactionById,
} = require("../controllers/transaction.controller")

const transactionRouter = express.Router()
transactionRouter.use(getUser())

transactionRouter.post('/add', createTransaction)
transactionRouter.get('/', getTransactions)
transactionRouter.get('/forMonth', getDailyTransactions)
transactionRouter.get('/totalForMonth', getTotalofMonth)
transactionRouter.get('/categoryWise', getTransactionsCategoryWise)
transactionRouter.delete('/delete/:id', deleteTransactionById)

module.exports = transactionRouter