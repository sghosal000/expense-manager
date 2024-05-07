import apiRequest from "./apiRequest"

class TransactionService {
    getTransactions(type) {
        return apiRequest.get(`/transactions?type=${type}`)
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
