const express = require("express")

const {
    signup,
    login,
    refreshToken
} = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/refreshToken', refreshToken)

module.exports = authRouter