import React, { useState, useRef, useEffect } from 'react';
import transactionService from '../../apiservice/transactionService'


export default function TransactionForm({ type, refresh }) {
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [note, setNote] = useState('')

    const [message, setMessage] = useState('')

    const categories = {
        income: ["Salary", "Business Income", "Investment Return", "Rental", "Freelancing", "Gift", "Pocket Money", "Govt Benifit"],
        expense: ["Food", "Transport", "Clothing", "Personal Care", "Household", "Groceries", "Rent", "Subscriptions", "Entertainment", "Hobbies", "Education", "Fees", "Loans", "Credit Card", "Insurance"],
        investment: ["Stocks", "Mutual Fund", "ETFs", "Bonds", "Real Estate", "Gold", "Cryptocurrencies"]
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newTransaction = {
            amount,
            categoryName: category,
            createdAt: date,
            note,
            type,
        }
        const res = await transactionService.addTransaction(newTransaction)

        if (res.status) {
            setMessage("Transaction added")
            refresh()
        }
        else {
            setMessage("Error.. try again")
        }
        setAmount("")
        setCategory("")
        setNote("")
        setDate(new Date().toISOString().split('T')[0])
    }

    return (
        <div className="flex flex-col items-center p-6 bg-base highlight-white rounded-lg">
            <h1 className="pb-6 text-txt-depressed">Add a new Transaction</h1>
            <p className={message.startsWith("Error") ? "text-red" : "text-green"}>{message}</p>
            <form onSubmit={handleSubmit} className="w-full space-y-2">
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
                    {/* <label htmlFor="category" className="form-label">Category</label> */}
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-field"
                        required
                    >
                        <option value="">select category</option>
                        {categories[type].map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="form-field"
                    />
                </div>
                <div>
                    <textarea
                        id="note"
                        value={note}
                        rows="2"
                        placeholder="Note"
                        onChange={(e) => setNote(e.target.value)}
                        className='form-field'
                    ></textarea>
                </div>
                <button type='submit' className="w-full py-2 text-center font-semibold rounded-md bg-accent hover:bg-sky-600 shadow-md transition-all">Add {type}</button>
            </form>
        </div>
    )
}