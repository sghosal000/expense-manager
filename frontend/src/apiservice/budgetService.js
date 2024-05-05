import apiRequest from "./apiRequest"


class BudgetService {
    getBudgets() {
        return apiRequest.get(`/budgets`)
    }

    getBudgetStatus(type) {
        return apiRequest.get(`/budgets/status?type=${type}`)
    }

    addBudget(transaction) {
        apiRequest.post("/transactions/add", data = transaction)
    }

    deleteBudget(id) {
        apiRequest.delete(`/transactions/delete/${id}`)
    }
}

const budgetService = new BudgetService()
export default budgetService
