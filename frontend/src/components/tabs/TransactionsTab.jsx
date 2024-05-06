import React, { useState, useEffect } from 'react'
import transactionService from '../../apiservice/transactionService'
import TransactionForm from '../forms/TransactionsForm'
import TransactionsTable from '../tables/TransactionsTable'
import LoadingDashboard from "../loading/LoadingDashboard"


const TransactionsTab = ({ type, activeTab }) => {
	const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
	const [trigger, setTrigger] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

	const fetchData = async() => {
		setLoading(true)
		
		try {
			const result = await transactionService.getTransactions(type)
			if(!result.status){
				throw error(result.error)
			}
			
			setTransactions(result.data.transactions)
			setErrorMessage(null)
		} catch (error) {
			console.error(error)
			setErrorMessage("Error Loading Data. Please try again later...")
		}
		finally{
			setLoading(false)
		}
	}
	
	const refresh = () => {
		setTrigger(!trigger)
	}
	
	useEffect(() => {
		fetchData()
	}, [activeTab, trigger])

	return (
		<div className="flex flex-row space-x-6">
			<div className="w-1/3">
				<TransactionForm type={type} refresh={refresh} />
			</div>
			<div className="w=2/3">
				<TransactionsTable data={transactions} refresh={refresh} />
			</div>
		</div>
	)
}

export default TransactionsTab