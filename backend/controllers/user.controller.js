require('dotenv').config()
const User = require("../models/user.model")
const verifyRole = require("../middlewares/verifyRole.middleware")

const getAllUsers = async (req, res) => {
    try {
        verifyRole(['admin'])(req, res, async () => {
            const users = await User.find().select('-password')
            res.status(200).json({ users });
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUserbyUsername = async (req, res) => {
    try {
        verifyRole(['admin'])(req, res, async () => {
            const { username } = req.params
            console.log(username);
            const foundUser = await User.find({ username: username }).select('-password')

            if(foundUser.length > 0) res.status(200).json({ foundUser })
            else res.status(404).json({ message: "no user found"})
        })
    } catch (error) {
        if(error.name === "CastError"){
            console.log(error)
            res.status(400).json({"message": "Invalid Id"})
        } else {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

const getUserbyId = async (req, res) => {
    try {
        verifyRole(['admin'])(req, res, async () => {
            const { id } = req.params
            console.log(id);
            const foundUser = await User.find({ _id: id }).select('-password')

            if(foundUser.length > 0) res.status(200).json({ foundUser })
            else res.status(404).json({ message: "no user found"})
        })
    } catch (error) {
        if(error.name === "CastError"){
            console.log(error)
            res.status(400).json({"message": "Invalid Id"})
        } else {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}



module.exports = {
    getAllUsers,
    getUserbyUsername,
    getUserbyId
}