import React, { useState, useEffect } from 'react'
// import budgetService from '../../apiservice/budgetService'
import BudgetForm from '../forms/BudgetForm'
import { ProgressBar } from '../charts/ProgressBar'
import LoadingDashboard from '../loading/LoadingDashboard'

import { useData } from '../../contexts/DataContext'

const BudgetTab = () => {
	const dataContext = useData()
	const { refresh, errorMessage, expenseStatus, investStatus } = dataContext

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