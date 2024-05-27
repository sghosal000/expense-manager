import React, { useState } from 'react'
import useBudgetService from '../../apiservice/useBudgetService'

import { useData } from '../../contexts/DataContext'


export const ProgressBar = ({ data }) => {
	const budgetService = useBudgetService()
	const { refresh } = useData()
	
	const [message, setMessage] = useState('')

	const progress = (data.totalSpent / data.goal) * 100

	let color = ''
	if (data.type === 'expense'){
		color = progress >= 80 ? "bg-light-red" : "bg-teal-500"
	} else {
		color = progress <= 60 ? "bg-light-red" : "bg-teal-500"
	}
	
	const handleDelete = async () => {
		try {
			const res = await budgetService.deleteBudget(data._id)
			if(res.status){
				refresh()
			}
		} catch (error) {
			console.error(error)
			setMessage("Couldn't delete budget.. Try again.")
		}
	}

	return (
		<div className='bg-base h-auto p-4 space-y-2 rounded-lg highlight-white content-center text-sm text-txt-depressed'>
			<div className='flex justify-between'>
				<h1 className='text-txt text-xl font-semibold'>{data.type}</h1>
				<p className='text-red'>{message}</p>
				<p className='text-red font-extrabold cursor-pointer' onClick={handleDelete}>X</p>
			</div>
			<div className='flex justify-between'>
				<p>Start Date: {data.startDate}</p>
				<p>End Date: {data.endDate}</p>
			</div>
			<div className='h-4 w-full rounded-full bg-neutral'>
				<div className={`h-full max-w-full ${color} rounded-full`} style={{ width: `${progress}%` }}></div>
			</div>
			<div className='flex justify-between text-txt'>
				<p>Total Spent: {data.totalSpent}</p>
				<p>Goal: {data.goal}</p>
			</div>
		</div>
	)
}
