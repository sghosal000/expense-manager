const express = require("express")
const cors = require('cors')
const cookies = require("cookie-parser")

const { logger } = require('./middlewares/logger.middleware')
const { errorHandler } = require('./middlewares/errorHandler.middleware')
const corsOptions = require('./config/corsOptions')

const dbConnect = require("./db/db.config")
const authRouter = require("./routes/auth.routes")
const adminRouter = require("./routes/admin.routes")
const transactionRouter = require("./routes/transaction.routes")
const budgetRouter = require("./routes/budget.routes")
const recurringTransaction = require("./routes/recurringTransaction.routes")

const cron = require("node-cron")
const { createScheduledTransaction } = require("./utils/addScheduledTransaction.utils")

const app = express()

app.use(logger)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))
app.use(cookies())

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/transactions', transactionRouter)
app.use('/budgets', budgetRouter)
app.use('/recurringTransactions', recurringTransaction)


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

app.use(errorHandler)
dbConnect()
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))