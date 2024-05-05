import apiRequest from "./apiRequest"

class TransactionService {
    getTransactions(type) {
        return apiRequest.get(`/transactions?type=${type}`)
    }

    addTransaction(transaction) {
        apiRequest.post("/transactions/add", data=transaction)
    }

    deleteTransaction(id) {
        apiRequest.delete(`/transactions/delete/${id}`)
    }
}

const transactionService = new TransactionService()
export default transactionService
