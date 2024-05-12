import React, { useState, useEffect } from 'react'
import budgetService from '../../apiservice/budgetService'
import BudgetForm from '../forms/BudgetForm'
import { ProgressBar } from '../charts/ProgressBar'

const BudgetTab = ({ activeTab }) => {
	const [budgets, setBudgets] = useState([])
	const [expenseStatus, setExpenseStatus] = useState({})
	const [investStatus, setInvestStatus] = useState({})
	const [loading, setLoading] = useState(true)
	const [trigger, setTrigger] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)


	const fetchData = async () => {
		setLoading(true)

		try {
			const result = await budgetService.getBudgets("")
			const result1 = await budgetService.getBudgetStatus("expense")
			// const result2 = await budgetService.getBudgetStatus("investment")
			if (!result.status || !result1.status) {
				throw error(result.error)
			}

			setBudgets(result.data.budgets)
			setExpenseStatus(result1.data)
			// setInvestStatus(result2.data)
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

	return (
		<div className="flex flex-col space-y-2 md:flex-row md:space-x-6">
			<div className="w-full md:w-1/3">
				<BudgetForm refresh={refresh} />
			</div>
			<div className='w-2/3'>
				<ProgressBar data={expenseStatus} />
			</div>
		</div >
	)
}

export default BudgetTab