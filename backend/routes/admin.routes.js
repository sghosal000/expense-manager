const express = require("express")

const {
    getAllUsers,
    getUserbyUsername,
    getUserbyId,
    removeUser,
    getAllTransactions,
    getAllTransactionByUsername,
    deleteTransactionById,
    getAllBudgets,
    getAllBudgetsByUsername,
    deleteBudgetById,
    getAllRecurringTransactions,
    getAllRecurringTransactionsByUsername,
    deleteRecurringTransactionById
} = require("../controllers/admin.controller")
const verifyRole = require("../middlewares/verifyRole.middleware")

const adminRouter = express.Router()
adminRouter.use(verifyRole(['admin']))

adminRouter.get('/users', getAllUsers)
adminRouter.get('/users/:username', getUserbyUsername)
adminRouter.get('/users/id/:id', getUserbyId)
adminRouter.delete('/users/remove/:id', removeUser)

adminRouter.get('/transactions/', getAllTransactions)
adminRouter.get('/transactions/:username', getAllTransactionByUsername)
adminRouter.delete('/transactions/remove/:id', deleteTransactionById)

adminRouter.get('/budgets/', getAllBudgets)
adminRouter.get('/budgets/:username', getAllBudgetsByUsername)
adminRouter.delete('/budgets/remove/:id', deleteBudgetById)

adminRouter.get('/recurring/', getAllRecurringTransactions)
adminRouter.get('/recurring/:username', getAllRecurringTransactionsByUsername)
adminRouter.delete('/recurring/remove/:id', deleteRecurringTransactionById)


module.exports = adminRouter