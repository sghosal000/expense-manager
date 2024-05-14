import React, { useState } from 'react'
import budgetService from '../../apiservice/budgetService'

const BudgetForm = ({ refresh }) => {
    const [amount, setAmount] = useState('')
    const [type, setType] = useState('expense')
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
        console.log(newTransaction);

        try {
            const { status } = await budgetService.addBudget(newTransaction)
            if (status) {
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
            <h1 className="pb-4 text-txt-depressed">Set a new Goal</h1>
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
                <div className="flex w-full space-x-4">
                    <div className='w-1/2'>
                        <input
                            type="radio"
                            id="expense"
                            name="type"
                            value="expense"
                            onChange={(e) => setType(e.target.value)}
                            className="peer hidden"
                            checked
                        />
                        <label
                            htmlFor="expense"
                            className='form-label highlight-white cursor-pointer select-none rounded-full py-2 text-center peer-checked:bg-neutral peer-checked:font-bold peer-checked:text-sky-300 transition-all'
                        >
                            Expense
                        </label>
                    </div>
                    <div className='w-1/2'>
                        <input
                            type="radio"
                            id="investment"
                            name="type"
                            value="investment"
                            onChange={(e) => setType(e.target.value)}
                            className='peer hidden'
                        />
                        <label
                            htmlFor="investment"
                            className='form-label highlight-white cursor-pointer select-none rounded-full py-2 text-center peer-checked:bg-neutral peer-checked:font-bold peer-checked:text-sky-300 transition-all'
                        >
                            Investment
                        </label>
                    </div>
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