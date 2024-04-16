const express = require("express")

const {
    signup,
    login,
    getAllUsers
} = require("../controllers/user.controller")

const userRouter = express.Router()

userRouter.post('/auth/register', signup)
userRouter.post('/auth/login', login)
userRouter.get('/all', getAllUsers)

module.exports = userRouter