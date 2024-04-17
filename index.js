const express = require("express")
const dbConnect = require("./db/db.config")
const authRouter = require("./routes/auth.routes")
const userRouter = require("./routes/user.routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth', authRouter)
app.use('/user', userRouter)

dbConnect()
app.listen(5000, () => console.log("Listening on http://localhost:5000"))