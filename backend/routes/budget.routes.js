const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const verifyRole = require("../middlewares/verifyRole.middleware")
const {
    createBudget,
    getBudgets,
    getAllBudgets,
    getAllBudgetsByUsername,
    deleteBudgetById,
    deleteBudgetByIdAdmin
} = require("../controllers/budget.controller")

const budgetRouter = express.Router()

budgetRouter.post('/add', getUser, createBudget)
budgetRouter.get('/', getUser, getBudgets)
budgetRouter.get('/all', verifyRole('admin'), getAllBudgets)
budgetRouter.get('/all/:username', verifyRole('admin'), getAllBudgetsByUsername)
budgetRouter.delete('/delete/:id', getUser, deleteBudgetById)
budgetRouter.delete('/remove/:id', verifyRole('admin'), deleteBudgetByIdAdmin)

module.exports = budgetRouter