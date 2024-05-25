import React, { createContext, useContext, useState } from 'react'

const DataContext = createContext(null)

export const DataProvider = (props) => {
	const [activeTab, setActiveTab] = useState('Dashboard')
	const [trigger, setTrigger] = useState(false)

	const refresh = () => {
		setTrigger(!trigger)
	}

	return (
		<DataContext.Provider value={{
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
