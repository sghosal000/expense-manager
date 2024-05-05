const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const {
    createBudget,
    getBudgets,
    getBudgetStatus,
    deleteBudgetById,
} = require("../controllers/budget.controller")

const budgetRouter = express.Router()

budgetRouter.post('/add', getUser, createBudget)
budgetRouter.get('/', getUser, getBudgets)
budgetRouter.get('/status', getUser, getBudgetStatus)
budgetRouter.delete('/delete/:id', getUser, deleteBudgetById)

module.exports = budgetRouter