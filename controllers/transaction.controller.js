const Transaction = require("../models/transaction.model")
const Category = require("../models/category.model")
const User = require("../models/user.model")

const createTransaction = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { amount, note, type, categoryName } = req.body

        if (!amount || !note || !type || !categoryName) {
            return res.status(400).json({ message: "missing required fields" })
        }

        let category = await Category.findOne({ name: categoryName })

        if (!category) {
            const newCategory = new Category({ name: categoryName, type })
            category = await newCategory.save()
        }
        if (!category.iscommon) {
            const user = await User.findById(userid)
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            if (!user.usercategories.includes(category._id)) {
                user.usercategories.push(category._id)
                await user.save()
            }
        }

        const newTransaction = new Transaction({
            userid,
            amount,
            note,
            type,
            categoryid: category._id,
            recurringid: null
        })
        await newTransaction.save()

        res.status(201).json({ message: "transaction created successfully" })
    } catch (error) {
        console.error(error);
        if(error.name === "ValidationError"){
            return res.status(401).json({ message: "validation error" })
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

const getTransactions = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const transactions = await Transaction.find({ userid: userid })
        res.status(200).json({ transactions })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

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
        const userid = req.user.userid
        const { id } = req.params
        console.log(id)
        
        const transaction = await Transaction.findOneAndDelete({ _id: id, userid })
        if(!transaction){
            return res.status(404).json({ message: "no transaction found" })
        }
        res.status(200).json( { message: "Successfully delted.", transaction })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteTransactionByIdAdmin = async (req, res) => {
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

module.exports = {
    createTransaction,
    getTransactions,
    getAllTransactions,
    getAllTransactionByUsername,
    deleteTransactionById,
    deleteTransactionByIdAdmin
}