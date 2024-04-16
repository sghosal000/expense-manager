const express = require("express")
const dbConnect = require("./db/db.config")
const userRouter = require("./routes/user.routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', userRouter)

dbConnect()
app.listen(5000, () => console.log("Listening on http://localhost:5000"))