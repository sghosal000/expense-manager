import apiRequest from "./apiRequest"

class TransactionService {
    getTransactions(type) {
        return apiRequest.get(`/transactions?type=${type}`)
    }
    
    getTransactionsForMonth(type, month) {
        return apiRequest.get(`/transactions/forMonth?month=${month}&type=${type}`)
    }

    getTotalTransactionsForMonth(month) {
        return apiRequest.get(`/transactions/totalForMonth?month=${month}`)
    }

    getTransactionsCategoryWise(type, month) {
        return apiRequest.get(`/transactions/categoryWise?month=${month}&type=${type}`)
    }

    addTransaction(transaction) {
        return apiRequest.post("/transactions/add", transaction)
    }

    deleteTransaction(id) {
        return apiRequest.delete(`/transactions/delete/${id}`)
    }
}

const transactionService = new TransactionService()
export default transactionService
