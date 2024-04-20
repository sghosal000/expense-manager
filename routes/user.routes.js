const express = require("express")

const {
    getAllUsers,
    getUserbyUsername,
    getUserbyId
} = require("../controllers/user.controller")

const userRouter = express.Router()

userRouter.get('/all', getAllUsers)
userRouter.get('/:username', getUserbyUsername)
userRouter.get('/id/:id', getUserbyId)

module.exports = userRouter