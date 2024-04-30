import axios from "axios"
import authService from "./AuthService"

const BASE_URL = import.meta.env.VITE_BASE_URL


class BudgetService {
    async getBudgets() {
        try {
            const res = await axios.get(BASE_URL + "/budgets", authService.attachTokenToRequest())
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }

    filterByType(allBudgets, type) {
        console.log(allBudgets);
        return allBudgets.filter((budget) => budget.type === type);
    }

    findExpStatus(){
        try {
            
        } catch (error) {
            
        }
    }

    async addBudget(budget) {
        try {
            const res = await axios.post(BASE_URL + "/budgets/add", budget, authService.attachTokenToRequest())
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }
    async deleteBudget(id) {
        try {
            const res = await axios.delete(BASE_URL + `budgets/delete/${id}`, authService.attachTokenToRequest())
            return { status: true, data: res.data }
        } catch (error) {
            console.error(error)
            return { status: false, error }
        }
    }
}

const budgetService = new BudgetService()
export default budgetService
