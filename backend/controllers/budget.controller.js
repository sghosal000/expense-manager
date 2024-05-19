const mongoose = require("mongoose")
const Budget = require("../models/budget.model")
const Transaction = require("../models/transaction.model")

const createBudget = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const { amount, type, startDate, endDate } = req.body
        if (!amount || !type) {
            return res.status(400).json({ message: "missing required fields" })
        }

        const existingBudget = await Budget.findOne({ userid, type })
        if (existingBudget) {
            return res.status(409).json({ message: "only one budget per category is allowed, delete previous budget first" })
        }

        const today = new Date()
        const budgetStartDate = startDate ? new Date(startDate) : today
        const budgetEndDate = endDate ? new Date(endDate) : new Date(budgetStartDate.getFullYear(), budgetStartDate.getMonth() + 1, 0)

        // if (budgetStartDate < today || budgetStartDate > new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())) {
        //     return res.status(400).json({ message: "start date should be after current date and less than one year" })
        // }
        if (budgetEndDate > new Date(budgetStartDate.getFullYear() + 1, budgetStartDate.getMonth(), budgetStartDate.getDate())) {
            return res.status(400).json({ message: "end date should be less than one year" })
        }

        const newBudget = new Budget({
            userid,
            amount,
            type,
            startDate: budgetStartDate,
            endDate: budgetEndDate
        })
        await newBudget.save()

        res.status(201).json({ message: "Budget created successfully" })
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(401).json({ message: "validation error" })
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

const getBudgets = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        let budgets = await Budget.find({ userid: userid })

        budgets = budgets.map((budget) => {
            return { ...budget._doc, isActive: budget.endDate >= new Date() }
        })
        res.status(200).json({ budgets })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getBudgetStatus = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const type = req.query.type
        const budget = await Budget.findOne({ userid, type })
        if (!budget) {
            return res.status(200).json()
        }

        const { _id, startDate, endDate } = budget
        const sumAmount = await Transaction.aggregate([
            {
                $match: {
                    $and: [
                        // bhai yaad rakhna ye, $match takes only one argumentand convert string to object id
                        { userid: new mongoose.Types.ObjectId(String(userid)) },
                        { type: type },
                        { createdAt: { $gte: startDate, $lte: endDate } }
                    ]
                }
            },
            {
                $group: {
                    _id: '$type',
                    totalAmount: { $sum: "$amount" },

                }
            }
        ])

        const totalSpent = sumAmount.length > 0 ? sumAmount[0].totalAmount : 0

        res.status(200).json({
            _id,
            type,
            startDate: startDate.toLocaleDateString(),
            endDate: endDate.toLocaleDateString(),
            totalSpent,
            goal: budget.amount
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteBudgetById = async (req, res) => {
    try {
        const userid = req.user.userid
        const { id } = req.params
        console.log(id)

        const budget = await Budget.findOneAndDelete({ _id: id, userid })
        if (!budget) {
            return res.status(404).json({ message: "no budget found" })
        }
        res.status(200).json({ message: "Successfully delted.", budget })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createBudget,
    getBudgets,
    getBudgetStatus,
    deleteBudgetById,
}