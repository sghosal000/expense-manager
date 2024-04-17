const express = require("express")

const {
    getAllUsers,
    getUserbyUsername
} = require("../controllers/user.controller")

const userRouter = express.Router()

userRouter.get('/all', getAllUsers)
userRouter.get('/:username', getUserbyUsername)

module.exports = userRouter