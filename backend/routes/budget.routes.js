const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const {
    createBudget,
    getBudgets,
    deleteBudgetById,
} = require("../controllers/budget.controller")

const budgetRouter = express.Router()

budgetRouter.post('/add', getUser, createBudget)
budgetRouter.get('/', getUser, getBudgets)
budgetRouter.delete('/delete/:id', getUser, deleteBudgetById)

module.exports = budgetRouter