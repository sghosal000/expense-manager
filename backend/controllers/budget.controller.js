const Budget = require("../models/budget.model")
const User = require("../models/user.model")

const createBudget = async (req, res) =>{
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        const { amount, type, endDate } = req.body
        if (!amount || !type) {
            return res.status(400).json({ message: "missing required fields" })
        }

        const existingBudget = await Budget.findOne({ userid, type })
        if(existingBudget){
            return res.status(409).json({ message: "only one budget per category is allowed, delete previous budget first"})
        }

        const budgetStartDate = new Date()
        const budgetEndDate = endDate? new Date(endDate): new Date(budgetStartDate.getFullYear(), budgetStartDate.getMonth()+1, 0)

        if (budgetEndDate > new Date(budgetStartDate.getFullYear()+1, budgetStartDate.getMonth(), budgetStartDate.getDate())){
            return res.status(400).json({ message: "end date should be less than one year"})
        }

        const newBudget = new Budget({
            userid,
            amount,
            type,
            startDate: budgetStartDate,
            endDate: budgetEndDate
        })
        await newBudget.save()

        res.status(201).json({ message: "Budget created successfully"})
    } catch (error) {
        console.error(error);
        if(error.name === "ValidationError"){
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
        
        const budgets = await Budget.find({ userid: userid })
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

const expBudgetStatus = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const budget = await Budget.findOne({ userid: userid, type: "expense" })
        const { startDate, endDate } = budget
        const expenseSum = await Transaction.aggregate([
            {
                $match: {
                    $and: [
                        // bhai yaad rakhna ye, $match takes only one argumentand convert string to object id
                        { userid: new mongoose.Types.ObjectId(String(userid)) },
                        { type: 'expense' },
                        {
                            createdAt: { $gte: startDate, $lte: endDate }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" },

                }
            }
        ])
        const totalSpent = expenseSum.length > 0 ? expenseSum[0].totalAmount : 0

        // const exps = await Transaction.find({ userid, type: 'expense', createdAt: { $gte: startDate, $lte: endDate } })
        // console.log(exps);
        // console.log({startDate, endDate});
        console.log(totalSpent);
        res.status(200).json({ totalSpent , goal: budget.amount })
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
        if(!budget){
            return res.status(404).json({ message: "no budget found" })
        }
        res.status(200).json( { message: "Successfully delted.", budget })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    createBudget,
    getBudgets,
    deleteBudgetById,
}