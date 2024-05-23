const mongoose = require("mongoose")
const Transaction = require("../models/transaction.model")
const Category = require("../models/category.model")
const User = require("../models/user.model")

const createTransaction = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const { amount, note, type, categoryName, createdAt } = req.body

        if (!amount || !type || !categoryName) {
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
            recurringid: null,
            createdAt
        })
        await newTransaction.save()

        res.status(201).json({ message: "transaction created successfully" })
    } catch (error) {
        console.error(error);
        if (error.name === "ValidationError") {
            return res.status(401).json({ message: "validation error" })
        }
        res.status(500).json({ message: "Internal server error" });
    }
}

// This returns all the transactions. if type is mentioned in query it will find only that type of transactions
const getTransactions = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        let query = { userid }
        const type = req.query.type
        if (type) {
            query.type = type
        }

        let transactions = await Transaction.find(query).populate('categoryid', 'name').sort({ updatedAt: -1 })
        transactions = transactions.map(transaction => ({
            _id: transaction._id,
            createdAt: new Date(transaction.createdAt).toLocaleDateString(),
            type: transaction.type,
            amount: transaction.amount,
            category: transaction.categoryid.name,
            note: transaction.note,
            isRecurring: transaction.recurringid ? true : false,
        }))

        res.status(200).json({ transactions })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// This returns the total transactions daywise for a month given in query (current month if blank)
// NOTE: type should be mentioned in query
const getDailyTransactions = async (req, res) => {
    try {
        const userid = req.user.userid;
        if (!userid) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let { month, type } = req.query;
        if (!month) {
            month = new Date().getMonth() + 1
        }
        if (!type) {
            return res.status(400).json({ message: "Missing required field: type" });
        }

        const year = new Date().getFullYear()
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        // console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString());

        let query = {
            userid,
            type,
            createdAt: { $gte: startDate, $lte: endDate }
        }

        const transactions = await Transaction.find(query).sort({ createdAt: 1 });

        const dailyTransactions = transactions.reduce((acc, transaction) => {
            const date = transaction.createdAt.getDate();
            acc[date] = (acc[date] || 0) + transaction.amount;
            return acc;
        }, {});

        for (let i = 1; i <= endDate.getDate(); i++) {
            if (!dailyTransactions.hasOwnProperty(i)) {
                dailyTransactions[i] = 0;
            }
        }

        res.status(200).json({ dailyTransactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// This returns the total transactions of each type in a month(given in query)
const getTotalofMonth = async (req, res) => {
    try {
        const userid = req.user.userid;
        if (!userid) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let { month } = req.query;
        if (!month) {
            month = new Date().getMonth() + 1
        }

        const year = new Date().getFullYear()
        const startDate = new Date(year, month - 1, 1)
        const endDate = new Date(year, month, 0)

        const sumAmount = await Transaction.aggregate([
            {
                $match: {
                    $and: [
                        // bhai yaad rakhna ye, $match takes only one argumentand convert string to object id
                        { userid: new mongoose.Types.ObjectId(String(userid)) },
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
        
        let totalOfMonth = {
            income: 0,
            expense: 0,
            investment: 0,
        }

        sumAmount.map((transaction) => {
            totalOfMonth[transaction._id] = transaction.totalAmount
        })

        res.status(200).json({ totalOfMonth });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// This returns total transactions category wise for a month. same constraints as previous ones
const getTransactionsCategoryWise = async (req, res) => {
    try {
        const userid = req.user.userid;
        if (!userid) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        let { month, type } = req.query;
        if (!month) {
            month = new Date().getMonth() + 1;
        }
        if (!type) {
            return res.status(400).json({ message: "Missing required field: type" });
        }

        const year = new Date().getFullYear();
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const query = {
            userid,
            type,
            createdAt: { $gte: startDate, $lte: endDate },
        };

        const transactions = await Transaction.find(query).populate('categoryid', 'name');

        let transactionsByCategory = transactions.reduce((acc, transaction) => {
            const categoryName = transaction.categoryid.name;
            acc[categoryName] = (acc[categoryName] || 0) + transaction.amount;
            return acc;
        }, {});

        // sorting the object by converting it to an array then sorting and again converting back to object
        transactionsByCategory = Object.fromEntries(Object.entries(transactionsByCategory).sort(([,a], [,b]) => b-a))

        res.status(200).json({ transactionsByCategory });
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
        if (!transaction) {
            return res.status(404).json({ message: "no transaction found" })
        }
        res.status(200).json({ message: "Successfully delted.", transaction })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createTransaction,
    getTransactions,
    getDailyTransactions,
    getTotalofMonth,
    getTransactionsCategoryWise,
    deleteTransactionById,
}