const express = require("express")

const {
    signup,
    login,
    refreshToken
} = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post('/register', signup)
authRouter.post('/login', login)
authRouter.post('/refreshToken', refreshToken)

module.exports = authRouter