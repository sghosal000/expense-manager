import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = (props) => {
	const [user, setUser] = useState('')
	const [accessToken, setAccessToken] = useState('')

	return (
		<AuthContext.Provider value={{
			user,
			setUser,
			accessToken,
			setAccessToken,
		}}>
			{props.children}
		</AuthContext.Provider>
	)
}

export default AuthContext