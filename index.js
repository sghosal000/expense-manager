const express = require("express")
require("./db/db.config")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

dbConnect()
app.listen(5000, () => console.l0g("Listening on http://localhost:5000"))