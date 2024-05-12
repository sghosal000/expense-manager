import apiRequest from "./apiRequest"


class RecurringService {
    getRecurrings() {
        return apiRequest.get(`/recurringTransactions`)
    }

    addRecurring(recurring) {
        return apiRequest.post("/recurringTransactions/add", data = recurring)
    }

    deleteRecurring(id) {
        return apiRequest.delete(`/recurringTransactions/delete/${id}`)
    }
}

const recurringService = new RecurringService()
export default recurringService
