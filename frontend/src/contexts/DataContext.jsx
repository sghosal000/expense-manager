import React, { createContext, useContext, useState, useEffect } from 'react'
import budgetService from '../apiservice/budgetService'

const DataContext = createContext(null)

export const DataProvider = (props) => {
	const [activeTab, setActiveTab] = useState('Dashboard')
	const [errorMessage, setErrorMessage] = useState(null)

	const [user, setUser] = useState({})
	const [loggedin, setLoggedin] = useState(false	)
	const [expenseStatus, setExpenseStatus] = useState({})
	const [investStatus, setInvestStatus] = useState({})
	const [trigger, setTrigger] = useState(false)

	const refresh = () => {
		setTrigger(!trigger)
	}

	const afterLogin = (user) => {
		setUser(user)
		setLoggedin(true)
	}

	const afterLogout = () => {
		localStorage.removeItem("jwtAccessToken")
		setUser({})
		setLoggedin(false)
	}

	const fetchBudgetData = async () => {
		// setLoading(true)
		setErrorMessage(null)

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
			// setLoading(false)
		}
	}

	useEffect(() => {
		fetchBudgetData()
	}, [activeTab, trigger])

	return (
		<DataContext.Provider value={{
			user,
			loggedin,
			afterLogin,
			afterLogout,
			activeTab,
			setActiveTab,
			refresh,
			errorMessage,
			expenseStatus,
			investStatus,
		}}>
			{props.children}
		</DataContext.Provider>
	)
}

export const useData = () => {
	const dataContext = useContext(DataContext)
	return dataContext
}
