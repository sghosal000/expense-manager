import React, { useState } from 'react';
import useTransactionService from '../../apiservice/useTransactionService'
import { useData } from '../../contexts/DataContext';


export default function TransactionForm({ type }) {
    const transactionService = useTransactionService()
    const { refresh } = useData()
    
    const [amount, setAmount] = useState('')
    const [category, setCategory] = useState('')
    const [date, setDate] = useState('')
    const [note, setNote] = useState('')

    const [message, setMessage] = useState('')

    const categories = {
        income: ["Salary", "Business Income", "Investment Return", "Rental", "Freelancing", "Gift", "Pocket Money", "Govt Benifit"],
        expense: ["Food", "Transport", "Clothing", "Personal Care", "Household", "Groceries", "Rent", "Subscriptions", "Entertainment", "Hobbies", "Education", "Fees", "Loans", "Credit Card", "Insurance", "Gift"],
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

        try {
            const res = await transactionService.addTransaction(newTransaction)
    
            if (res.status) {
                setMessage("Transaction added")
                refresh()
            }
        } catch (error) {
            console.error(error);
            setMessage("Error.. try again")
        } finally {
            setAmount("")
            setCategory("")
            setNote("")
            setDate('')

            setTimeout(() => setMessage(''), 5000)
        }
    }

    return (
        <div className="flex flex-col items-center p-6 bg-base highlight-white rounded-lg">
            <h1 className="pb-4 text-txt-depressed">Add a new Transaction</h1>
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
                <button type='submit' className="form-submit">Add {type}</button>
                {/* <button data-modal-target="popup-modal" data-modal-toggle="popup-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                    Toggle modal
                </button>
                <div id="popup-modal" tabindex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                    </div>
                </div> */}
            </form>
        </div>
    )
}