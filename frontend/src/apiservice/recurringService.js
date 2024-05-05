import apiRequest from "./apiRequest"


class RecurringService {
    getRecurrings() {
        return apiRequest.get(`/recurringTransactions`)
    }

    addRecurring(recurring) {
        apiRequest.post("/recurringTransactions/add", data = recurring)
    }

    deleteRecurring(id) {
        apiRequest.delete(`/recurringTransactions/delete/${id}`)
    }
}

const recurringService = new RecurringService()
export default recurringService
