import React, { useState } from 'react'
import budgetService from '../../apiservice/budgetService'

const BudgetForm = ({ refresh }) => {
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('')
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])

    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newTransaction = {
            amount,
            type,
            startDate,
            endDate,
        }

        try {
            const { status } = await budgetService.addBudget(newTransaction)
            if (res.status) {
                setMessage("Transaction added")
                refresh()
            }
        } catch (error) {
            console.error(error);
            setMessage("Error.. try again")
        } finally {
            setAmount("")
            setType("")
            setStartDate(new Date().toISOString().split('T')[0])
            setEndDate(new Date().toISOString().split('T')[0])
        }
    }

    return (
        <div className="flex flex-col items-center p-6 bg-base highlight-white rounded-lg">
            <h1 className="pb-6 text-txt-depressed">Set a new Goal</h1>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="h-1">
                    <p className={`text-xs ${message.startsWith("Error") ? "text-red" : "text-green"}`}>{message}</p>
                </div>
                <div>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        placeholder='amount'
                        onChange={(e) => setAmount(e.target.value)}
                        className="form-field"
                        required
                    />
                </div>
                <div className="flex flex-row space-x-2">
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="form-field"
                        required
                    >
                        <option value="expense">Expense</option>
                        <option value="investment">Investment</option>
                    </select>
                </div>
                <div className='flex space-x-2'>
                    <div className='w-1/2'>
                        {/* without text-left it showing in center. don't know why */}
                        <label htmlFor="startDate" className="form-label text-left">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="form-field"
                        />
                    </div>
                    <div className='w-1/2'>
                        <label htmlFor="endDate" className="form-label text-left">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="form-field"
                        />
                    </div>
                </div>
                <button type='submit' className="w-full py-2 text-center font-semibold rounded-md bg-accent hover:bg-sky-600 shadow-md transition-all">Add new Budget</button>
            </form>
        </div>
    )
}

export default BudgetForm