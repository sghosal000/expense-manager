import useApiRequest from "./useApiRequest"


const useBudgetService = () => {
    const apiRequest = useApiRequest()

    const getBudgets = () => {
        return apiRequest.get(`/budgets`)
    }
    
    const getBudgetStatus = (type) => {
        return apiRequest.get(`/budgets/status?type=${type}`)
    }
    
    const addBudget = (transaction) => {
        return apiRequest.post("/budgets/add", transaction)
    }
    
    const deleteBudget = (id) => {
        return apiRequest.delete(`/budgets/delete/${id}`)
    }

    const budgetService = {
        getBudgets,
        getBudgetStatus,
        addBudget,
        deleteBudget
    }

    return budgetService
}

export default useBudgetService
