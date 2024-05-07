import React from 'react'
import transactionService from '../../apiservice/transactionService'

const TransactionsTable = ({ data, refresh }) => {
    const amountColor = data?.[0]?.type === "income" ? "text-green" : data?.[0]?.type === "expense" ? "text-red" : "text-cyan"

    const handleRemove = async (id) => {
        try {
            const res = await transactionService.deleteTransaction(id)

            if(res.status){
                refresh()
            }
        } catch (error) {
            console.error("Error removing transaction:", error)
        }
    }

    return (
        <div className="bg-base highlight-white rounded-lg overflow-x-auto">
            <table className="max-h-80 min-w-full flex flex-col text-sm text-center">
                <thead className='w-full bg-neutral'>
                    <tr className='flex justify-between'>
                        <th className="table-data">Date</th>
                        <th className="table-data">Amount</th>
                        <th className="table-data">Category</th>
                        <th className="table-data">Note</th>
                        <th className="table-data">Is Recurring</th>
                        <th className="table-data"></th>
                    </tr>
                </thead>
                <tbody className="overflow-y-auto">
                    {data && data.map(transaction => (
                        <tr key={transaction._id} className="border-t border-neutral text-txt-depressed">
                            <td className="table-data w-2/12">{transaction.createdAt}</td>
                            <td className={`table-data ${amountColor} w-2/12`}>{transaction.amount}</td>
                            <td className="table-data w-1/12">{transaction.category}</td>
                            <td className="table-data w-4/12">{transaction.note}</td>
                            <td className="table-data w-2/12">{transaction.isRecurring ? "Yes" : "No"}</td>
                            <td className="table-data text-accent w-1/12">
                                <a href="#" onClick={() => handleRemove(transaction._id)}>remove</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionsTable