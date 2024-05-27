import React, { useState, useEffect } from 'react'
import useBudgetService from '../../apiservice/useBudgetService'
import BudgetForm from '../forms/BudgetForm'
import { ProgressBar } from '../charts/ProgressBar'

import { useData } from '../../contexts/DataContext'

const BudgetTab = () => {
	const budgetService = useBudgetService()
	
	const dataContext = useData()
	const { activeTab, trigger } = dataContext

	const [expenseStatus, setExpenseStatus] = useState({})
	const [investStatus, setInvestStatus] = useState({})
	
	const [loading, setLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

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
		} finally {
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
		<div className="flex flex-col space-y-2 md:flex-row md:space-x-6">
			<div className="w-full md:w-1/3">
				<BudgetForm />
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