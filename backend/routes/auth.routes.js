const express = require("express")
const getUser = require("../middlewares/getUser.middleware")

const {
    signup,
    login,
    logout,
    getDetails,
    refreshToken
} = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/details', getUser(), getDetails)
authRouter.get('/refreshToken', refreshToken)

module.exports = authRouter