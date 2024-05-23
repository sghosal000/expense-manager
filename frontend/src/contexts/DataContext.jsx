import React, { createContext, useContext, useState, useEffect } from 'react'

const DataContext = createContext(null)

export const DataProvider = (props) => {
	const [activeTab, setActiveTab] = useState('Dashboard')

	const [user, setUser] = useState({})
	const [loggedin, setLoggedin] = useState(false	)
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

	return (
		<DataContext.Provider value={{
			user,
			loggedin,
			afterLogin,
			afterLogout,
			activeTab,
			setActiveTab,
			trigger,
			refresh,
		}}>
			{props.children}
		</DataContext.Provider>
	)
}

export const useData = () => {
	const dataContext = useContext(DataContext)
	return dataContext
}
