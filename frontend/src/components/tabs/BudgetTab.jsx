import React, { useState, useEffect } from 'react'
import budgetService from '../../apiservice/budgetService'
import BudgetForm from '../forms/BudgetForm'
import { ProgressBar } from '../charts/ProgressBar'
import LoadingDashboard from '../loading/LoadingDashboard'

const BudgetTab = ({ activeTab }) => {
	const [expenseStatus, setExpenseStatus] = useState({})
	const [investStatus, setInvestStatus] = useState({})
	const [loading, setLoading] = useState(true)
	const [trigger, setTrigger] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)


	const fetchData = async () => {
		setLoading(true)

		try {
			const resExp = await budgetService.getBudgetStatus("expense")
			const resInv = await budgetService.getBudgetStatus("investment")
			if (!resExp.status || !resInv.status) {
				throw error(result.error)
			}

			setExpenseStatus(resExp.data)
			setInvestStatus(resInv.data)
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

	if(loading){
		return(
			<LoadingDashboard />
		)
	}

	return (
		<div className="flex flex-col space-y-2 md:flex-row md:space-x-6">
			<div className="w-full md:w-1/3">
				<BudgetForm refresh={refresh} />
			</div>
			<div className='w-full md:w-2/3 h-72 md:h-auto flex flex-col justify-around'>
				{ expenseStatus && <ProgressBar data={expenseStatus} />}
				{ !expenseStatus && <p className='text-lg text-txt-depressed'>No Expense goal has been set yet.<br /> Try adding a goal this month for better managing your finance</p> }
				{ investStatus && <ProgressBar data={investStatus} />}
				{ !investStatus && <p className='text-lg text-txt-depressed'>No Investment goal has been set yet.<br /> Try adding a goal this month for better managing your finance</p> }
			</div>
		</div >
	)
}

export default BudgetTab