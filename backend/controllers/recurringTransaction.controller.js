const RecurringTransaction = require("../models/recurringTransaction.model")
const Category = require("../models/category.model")
const User = require("../models/user.model")
const { calculateNextExecutionDate } = require("../utils/addScheduledTransaction.utils")

const createRecurringTransaction = async (req, res) => {
    try {
        const userid = req.user.userid
        if(!userid){
            return res.status(401).json({ message: "unauthorized"})
        }

        const { amount, type, categoryName, startDate, frequency, note } = req.body
        if(!amount || !type || !categoryName || !frequency){
            return res.status(400).json({ message: "missing required fields" })
        }

        let category = await Category.findOne({ name: categoryName })
        // if (category){
        //     const existingRecurringTransaction = await RecurringTransaction.findOne({ amount, type, categoryId: category._id, frequency })
        //     if (existingRecurringTransaction){
        //         return res.status(409).json({ message: "same recurring transaction already exists"})
        //     }
        // }
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

        const now = new Date()
        const transactionStartDate = startDate? new Date(startDate): new Date(now.getFullYear(), now.getMonth(), now.getDate()+1)
        const nextExecutionDate = calculateNextExecutionDate(transactionStartDate, frequency)

        const newRecurringTransaction = new RecurringTransaction({
            userid,
            amount,
            type,
            categoryId: category._id,
            startDate: transactionStartDate,
            frequency,
            note,
            nextExecutionDate
        })
        await newRecurringTransaction.save()

        res.status(201).json({ message: "new recurring transaction created successfully"})
    } catch (error) {
        console.error(error);
        if(error.name === "ValidationError"){
            return res.status(401).json({ message: "validation error" })
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

const getRecurringTransactions = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        
        const recurringTransactions = await RecurringTransaction.find({ userid: userid })
        if(recurringTransactions.length === 0){
            return res.status(404).json({ message: "no Recurring Transaction found" });
        }

        res.status(200).json( recurringTransactions )
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

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
        const userid = req.user.userid
        const { id } = req.params
        console.log(id)
        
        const recurringTransaction = await RecurringTransaction.findOneAndDelete({ _id: id, userid })
        if(!recurringTransaction){
            return res.status(404).json({ message: "no Recurring Transaction found" })
        }
        res.status(200).json( { message: "Successfully delted.", recurringTransaction })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteRecurringTransactionByIdAdmin = async (req, res) => {
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
    createRecurringTransaction,
    getRecurringTransactions,
    getAllRecurringTransactions,
    getAllRecurringTransactionsByUsername,
    deleteRecurringTransactionById,
    deleteRecurringTransactionByIdAdmin
}