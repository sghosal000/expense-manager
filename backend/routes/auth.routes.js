const express = require("express")
const getUser = require("../middlewares/getUser.middleware")

const {
    signup,
    login,
    getDetails,
    refreshToken
} = require("../controllers/auth.controller")

const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.get('/details', getUser(), getDetails)
authRouter.post('/refreshToken', refreshToken)

module.exports = authRouter