import React, { useState, useEffect } from 'react'
import transactionService from '../../apiservice/transactionService'
import TransactionForm from '../forms/TransactionsForm'
import TransactionsTable from '../tables/TransactionsTable'
import LineChart from '../charts/LineChart'
import DoughnutChart from '../charts/PieChart'
import LoadingDashboard from "../loading/LoadingDashboard"
import { amountByType } from '../charts/Fake_data2'
import { lineChartData } from '../charts/FAKE_DATA';


const TransactionsTab = ({ type, activeTab }) => {
	const [transactions, setTransactions] = useState([])
	const [transactionsMonth, setTransactionsMonth] = useState({})
	const [transactionsByCategory, setTransactionsByCategory] = useState({})
	const [loading, setLoading] = useState(true)
	const [trigger, setTrigger] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)

	const fetchData = async () => {
		setLoading(true)

		try {
			const result = await transactionService.getTransactions(type)
			const result1 = await transactionService.getTransactionsForMonth(type, "")
			const result2 = await transactionService.getTransactionsCategoryWise(type, "")
			if (!result.status || !result1.status || !result2.status) {
				throw error(result.error)
			}

			setTransactions(result.data.transactions)
			setTransactionsMonth(result1.data.dailyTransactions)
			setTransactionsByCategory(result2.data.transactionsByCategory)
			setErrorMessage(null)
		} catch (error) {
			console.error(error)
			setErrorMessage("Error Loading Data. Please try again later...")
		}
		finally {
			setLoading(false)
		}
	}

	const refresh = () => {
		setTrigger(!trigger)
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
					<TransactionForm type={type} refresh={refresh} />
				</div>
				<div className="w-full h-60 md:w-2/3 md:h-auto">
					<LineChart data={transactionsMonth} />
				</div>
			</div>
			<div className=" h-80 flex flex-col space-y-2 md:flex-row md:space-x-6">
				<div className="w-full h-full md:w-2/3">
					<TransactionsTable data={transactions} refresh={refresh} />
				</div>
				<div className='w-full h-60 md:w-1/3 md:h-80'>
					<DoughnutChart amountByType={transactionsByCategory} />
				</div>
			</div>
		</div>
	)
}

export default TransactionsTab