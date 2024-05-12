import apiRequest from "./apiRequest"


class BudgetService {
    getBudgets() {
        return apiRequest.get(`/budgets`)
    }

    getBudgetStatus(type) {
        return apiRequest.get(`/budgets/status?type=${type}`)
    }

    addBudget(transaction) {
        return apiRequest.post("/budgets/add", transaction)
    }

    deleteBudget(id) {
        return apiRequest.delete(`/budgets/delete/${id}`)
    }
}

const budgetService = new BudgetService()
export default budgetService
