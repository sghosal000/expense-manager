const express = require("express")
const getUser = require("../middlewares/getUser.middleware")
const {
    createBudget,
    getBudgets,
    getBudgetStatus,
    deleteBudgetById,
} = require("../controllers/budget.controller")

const budgetRouter = express.Router()
budgetRouter.use(getUser())

budgetRouter.post('/add', createBudget)
budgetRouter.get('/', getBudgets)
budgetRouter.get('/status', getBudgetStatus)
budgetRouter.delete('/delete/:id', deleteBudgetById)

module.exports = budgetRouter