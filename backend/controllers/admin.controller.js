require('dotenv').config()
const User = require("../models/user.model")
const Transaction = require("../models/transaction.model")
const Budget = require("../models/budget.model")
const RecurringTransaction = require("../models/recurringTransaction.model")


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json({ users })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const getUserbyUsername = async (req, res) => {
    try {
        const { username } = req.params
        console.log(username)
        const foundUser = await User.find({ username: username }).select('-password')

        if (foundUser.length > 0) res.status(200).json({ foundUser })
        else res.status(404).json({ message: "no user found" })
    } catch (error) {
        if (error.name === "CastError") {
            console.log(error)
            res.status(400).json({ message: "Invalid Id" })
        } else {
            console.error(error);
            res.status(500).json({ message: "Internal server error" })
        }
    }
}

const getUserbyId = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const foundUser = await User.find({ _id: id }).select('-password')

        if (foundUser.length > 0) res.status(200).json({ foundUser })
        else res.status(404).json({ message: "no user found" })
    } catch (error) {
        if (error.name === "CastError") {
            console.log(error)
            res.status(400).json({ message: "Invalid Id" })
        } else {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

const removeUser = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)

        const user = await User.findOneAndDelete({ _id: id })
        if(!user){
            return res.status(404).json({ message: "no user found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// Admin conttrols for transactions

const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find()
        res.status(200).json({ transactions })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllTransactionByUsername = async (req, res) => {
    try {
        const { username } = req.params
        console.log(username)
        const foundUser = await User.findOne({ username: username }).select('_id')
        if(!foundUser){
            return res.status(404).json({ message: "User not found" });
        }

        const transactions = await Transaction.find({ userid: foundUser._id })
        res.status(200).json( transactions )
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteTransactionById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        
        const transaction = await Transaction.findOneAndDelete({ _id: id })
        if(!transaction){
            return res.status(404).json({ message: "no record found" })
        }
        res.status(200).json( { message: "Successfully delted.", transaction })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Admin conttrols for budgets

const getAllBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find()
        if(budgets.length === 0){
            return res.status(404).json({ message: "no Budget found" });
        }

        const formattedBudgets = budgets.map((budget) => {
            return { ...budget._doc, isActive: budget.endDate >= new Date() }
        })
        res.status(200).json( formattedBudgets )
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllBudgetsByUsername = async (req, res) => {
    try {
        const { username } = req.params
        console.log(username)
        const foundUser = await User.findOne({ username: username }).select('_id')
        if(!foundUser){
            return res.status(404).json({ message: "User not found" });
        }

        const budgets = await Budget.find({ userid: foundUser._id })
        const formattedBudgets = budgets.map((budget) => {
            return { ...budget._doc, isActive: budget.endDate >= new Date() }
        })
        res.status(200).json( formattedBudgets )
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteBudgetById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        
        const budget = await Budget.findOneAndDelete({ _id: id })
        if(!budget){
            return res.status(404).json({ message: "no budget found" })
        }
        res.status(200).json( { message: "Successfully delted.", budget })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Admin conttrols for recurring transactions

const getAllRecurringTransactions = async (req, res) => {
    try {
        const recurringTransactions = await RecurringTransaction.find()
        if(recurringTransactions.length === 0){
            return res.status(404).json({ message: "no Recurring Transaction found" });
        }

        res.status(200).json( recurringTransactions )
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAllRecurringTransactionsByUsername = async (req, res) => {
    try {
        const { username } = req.params
        console.log(username)
        const foundUser = await User.findOne({ username: username }).select('_id')
        if(!foundUser){
            return res.status(404).json({ message: "User not found" });
        }

        const recurringTransactions = await RecurringTransaction.find({ userid: foundUser._id })

        res.status(200).json( recurringTransactions )
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteRecurringTransactionById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        
        const recurringTransaction = await RecurringTransaction.findOneAndDelete({ _id: id })
        if(!recurringTransaction){
            return res.status(404).json({ message: "no Recurring Transaction found" })
        }
        res.status(200).json( { message: "Successfully delted.", recurringTransaction })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllUsers,
    getUserbyUsername,
    getUserbyId,
    removeUser,
    getAllTransactions,
    getAllTransactionByUsername,
    deleteTransactionById,
    getAllBudgets,
    getAllBudgetsByUsername,
    deleteBudgetById,
    getAllRecurringTransactions,
    getAllRecurringTransactionsByUsername,
    deleteRecurringTransactionById
}