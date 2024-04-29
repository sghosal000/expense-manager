const Transaction = require("../models/transaction.model")
const RecurringTransaction = require("../models/recurringTransaction.model")

const createScheduledTransaction = async () => {
    try {
        const dueTransactions = await RecurringTransaction.find({ nextExecutionDate: { $lte: new Date() } })

        dueTransactions.forEach(async dueTransaction => {
            try {
                const { _id, userid, amount, type, categoryid, frequency, note } = dueTransaction
                const newTransaction = new Transaction({
                    userid,
                    amount,
                    note,
                    type,
                    categoryid,
                    recurringid: _id
                })
                await newTransaction.save()
                console.log(`New transaction created for recurring Transaction id: ${_id}`);
                
                const nextExecutionDate = calculateNextExecutionDate(new Date(), frequency)
                dueTransaction.nextExecutionDate = nextExecutionDate
                await dueTransaction.save()
                console.log(`Next execution date updated for recurring Transaction id: ${_id}`);
            } catch (error) {
                console.error(`Error creating transaction. Transaction id: ${_id}`, error)
            }

        })
    } catch (error) {
        console.error("Error creating transaction from recurring:", error.message)
    }
}

const calculateNextExecutionDate = (startDate, frequency) => {
    const { interval, unit } = frequency

    switch (unit) {
        case "day":
            if (interval >= 30) throw new Error("fequency should be less than 30 days")
            return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + interval)
        case "week":
            if (interval >= 4) throw new Error("fequency should be less than 4 weeks")
            return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + interval * 7)
        case "month":
            if (interval >= 12) throw new Error("fequency should be less than 12 months")
            return new Date(startDate.getFullYear(), startDate.getMonth() + interval, startDate.getDate())
        case "year":
            if (interval > 3) throw new Error("fequency should be less than 3 years")
            return new Date(startDate.getFullYear() + interval, startDate.getMonth(), startDate.getDate())

        default:
            throw new Error("invalid frequency unit given")
    }
}


module.exports = { calculateNextExecutionDate, createScheduledTransaction }