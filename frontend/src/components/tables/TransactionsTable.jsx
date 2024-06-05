import React from 'react'
import useTransactionService from '../../apiservice/useTransactionService'
import { useData } from '../../contexts/DataContext'

const TransactionsTable = ({ data }) => {
    const transactionService = useTransactionService()
    const { refresh } = useData()
    
    const handleDelete = async (id) => {
        try {
            const res = await transactionService.deleteTransaction(id)

            if (res.status) {
                refresh()
            }
        } catch (error) {
            console.error("Error removing transaction:", error)
        }
    }

    return (
        <div className="bg-base highlight-white rounded-lg overflow-x-auto">
            <table className="max-h-80 min-w-full flex flex-col text-xs md:text-sm text-center">
                <thead className='w-full bg-neutral'>
                    <tr className='flex justify-between'>
                        <th className="table-data w-3/12 text-left">Category</th>
                        <th className="table-data w-2/12">Date</th>
                        <th className="table-data w-2/12">Amount</th>
                        {/* <th className="table-data">Note</th> */}
                        <th className="table-data w-2/12">Recurring</th>
                        <th className="table-data w-2/12"></th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto">
                    {data && data.map((transaction, index) => (
                        <tr key={transaction._id} className="border-t border-neutral text-txt">
                            <td className="table-data w-3/12 text-left py-0">
                                <p>{index+1}. {transaction.category}</p>
                                <p className='text-xs text-txt-depressed'>Note: {transaction.note}</p>
                            </td>
                            <td className="table-data w-2/12">{transaction.createdAt}</td>
                            <td className={`table-data ${transaction.type === "income" ? "text-light-green" : transaction.type === "expense" ? "text-light-red" : "text-light-cyan"} w-2/12`}>{transaction.amount}</td>
                            {/* <td className="table-data w-3/12"></td> */}
                            <td className="table-data w-2/12">{transaction.isRecurring ? "Yes" : "No"}</td>
                            <td className="table-data text-accent w-2/12 space-x-4">
                                <a href="#" onClick={() => handleDelete(transaction._id)}>edit</a>
                                <a href="#" onClick={() => handleDelete(transaction._id)} className='text-rose-400'>remove</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionsTable