import React, { useState, useEffect } from 'react'
import useTransactionService from '../../apiservice/useTransactionService'
import TransactionForm from '../forms/TransactionsForm'
import TransactionsTable from '../tables/TransactionsTable'
import LineChart from '../charts/LineChart'
import DoughnutChart from '../charts/PieChart'

import { useData } from '../../contexts/DataContext'

const TransactionsTab = ({ type }) => {
	const transactionService = useTransactionService()
	
	const { activeTab, trigger } = useData()

	const [transactions, setTransactions] = useState([])
	const [transactionsMonth, setTransactionsMonth] = useState({})
	// const [totalTransaction, setTotalTransaction] = useState({})
	const [transactionsByCategory, setTransactionsByCategory] = useState({})

	const [loading, setLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)

	const fetchData = async () => {
		setLoading(true)

		try {
			const resTransaction = await transactionService.getTransactions(type)
			const resTransactionsForMonth = await transactionService.getTransactionsForMonth(type, "")
            // const resTotalTransaction = await transactionService.getTotalTransactionsForMonth("")
			const resTransactionsByCategory = await transactionService.getTransactionsCategoryWise(type, "")

			if (!resTransaction.status) {
				throw error(resTransaction.error)
			}
			if(!resTransactionsForMonth.status){
				throw error(resTransactionsForMonth.error)
			}
            // if(!resTotalTransaction.status){
            //     throw error(resTotalTransaction.error)
            // }
            if(!resTransactionsByCategory.status){
                throw error(resTransactionsByCategory.error)
            }

			setTransactions(resTransaction.data.transactions)
			setTransactionsMonth(resTransactionsForMonth.data.dailyTransactions)
            // setTotalTransaction(resTotalTransaction.data.totalOfMonth)
			setTransactionsByCategory(resTransactionsByCategory.data.transactionsByCategory)
			setErrorMessage(null)
		} catch (error) {
			console.error(error)
			setErrorMessage("Error Loading Data. Please try again later...")
		}
		finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [activeTab, trigger])

	if (errorMessage) {
		return (
			<p>{errorMessage}</p>
		)
	}

	return (
		<div className='flex flex-col space-y-2'>
			<div className="flex flex-col space-y-2 md:flex-row md:space-x-6">
				<div className="w-full md:w-1/3">
					<TransactionForm type={type} />
				</div>
				<div className="w-full h-auto md:w-2/3 md:h-auto">
					<LineChart data={transactionsMonth} />
				</div>
			</div>
			<div className="flex flex-col space-y-2 md:flex-row md:space-x-6 md:h-80">
				<div className="w-full h-full md:w-2/3 md:text-xs">
					<TransactionsTable data={transactions} />
				</div>
				<div className='w-full h-auto flex justify-center md:w-1/3'>
					<DoughnutChart amountByType={transactionsByCategory} />
				</div>
			</div>
		</div>
	)
}

export default TransactionsTab