import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = (props) => {
	const [user, setUser] = useState({})
	const [accessToken, setAccessToken] = useState('')

	const afterLogin = (data) => {
		setUser(data.user)
		setAccessToken(data.accessToken)
	}

	const afterLogout = () => {
		setUser({})
		setAccessToken('')
	}

	return (
		<AuthContext.Provider value={{
			user,
			setUser,
			accessToken,
			setAccessToken,
			afterLogin,
			afterLogout,
		}}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContext