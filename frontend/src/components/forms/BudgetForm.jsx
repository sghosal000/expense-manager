import React, { useState } from 'react'
import useBudgetService from '../../apiservice/useBudgetService'

import { useData } from '../../contexts/DataContext'

const BudgetForm = () => {
    const budgetService = useBudgetService()
	const { refresh } = useData()

    const getCurrentMonthDates = () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const formatToDateInput = (date) => date.toISOString().split('T')[0];

        return {
            startDate: formatToDateInput(startOfMonth),
            endDate: formatToDateInput(endOfMonth),
        };
    };

    const [amount, setAmount] = useState('')
    const [type, setType] = useState('expense')
    // set to start and end date of the month in later version
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

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
            if (status) {
                setMessage("Transaction added")
                refresh()
            }
            // for !status error won't be thrown, so no error message will be set. check it later
        } catch (error) {
            setMessage("Error.. try again")
            console.error(error)
        } finally {
            setAmount("")
            setType("")
            setStartDate('')
            setEndDate('')

            setTimeout(() => setMessage(''), 5000)
        }
    }

    return (
        <div className="flex flex-col items-center p-6 bg-base highlight-white rounded-lg">
            <h1 className="pb-4 text-txt-depressed">Set a new Goal</h1>
            <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="h-1">
                    <p className={`text-xs ${message.startsWith("Error") ? "text-light-red" : "text-light-green"}`}>{message}</p>
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