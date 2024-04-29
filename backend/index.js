const express = require("express")
const cookies = require("cookie-parser")
const dbConnect = require("./db/db.config")
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")
const transactionRouter = require("./routes/transaction.routes")
const recurringTransaction = require("./routes/recurringTransaction.routes")
const budgetRouter = require("./routes/budget.routes")

const cron = require("node-cron")
const { createScheduledTransaction } = require("./utils/addScheduledTransaction.utils")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookies())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/transactions', transactionRouter)
app.use('/recurringTransactions', recurringTransaction)
app.use('/budgets', budgetRouter)


try {
    cron.schedule('0 0 * * *', createScheduledTransaction, {
        scheduled: false,
    });
    
    setTimeout(() => {
        cron.schedule('0 0 * * *', createScheduledTransaction, {
            scheduled: true,
            timezone: 'Asia/Kolkata'
        });
    }, 1000)
} catch (error) {
    console.log(error);
}

dbConnect()
app.listen(5000, () => console.log("Listening on http://localhost:5000"))