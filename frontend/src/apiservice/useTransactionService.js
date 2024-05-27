import useApiRequest from "./useApiRequest"


const useTransactionService = () => {
    const apiRequest = useApiRequest()
    
    const getTransactions = (type) => {
        return apiRequest.get(`/transactions?type=${type}`)
    }
    
    const getTransactionsForMonth = (type, month) => {
        return apiRequest.get(`/transactions/forMonth?month=${month}&type=${type}`)
    }
    
    const getTotalTransactionsForMonth = (month) => {
        return apiRequest.get(`/transactions/totalForMonth?month=${month}`)
    }
    
    const getTransactionsCategoryWise = (type, month) => {
        return apiRequest.get(`/transactions/categoryWise?month=${month}&type=${type}`)
    }
    
    const addTransaction = (transaction) => {
        return apiRequest.post("/transactions/add", transaction)
    }
    
    const deleteTransaction = (id) => {
        return apiRequest.delete(`/transactions/delete/${id}`)
    }

    const transactionService = {
        getTransactions,
        getTransactionsForMonth,
        getTotalTransactionsForMonth,
        getTransactionsCategoryWise,
        addTransaction,
        deleteTransaction
    }
    
    return transactionService
}

export default useTransactionService
