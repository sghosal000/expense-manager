import useApiRequest from "./apiRequest"


const useRecurringService = () => {
    const apiRequest = useApiRequest()

    const getRecurrings = () => {
        return apiRequest.get(`/recurringTransactions`)
    }
    
    const addRecurring = (recurring) => {
        return apiRequest.post("/recurringTransactions/add", data = recurring)
    }
    
    const deleteRecurring = (id) => {
        return apiRequest.delete(`/recurringTransactions/delete/${id}`)
    }

    const recurringService = {
        getRecurrings,
        addRecurring,
        deleteRecurring
    }

    return recurringService
}

export default useRecurringService
