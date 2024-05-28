import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { DataProvider } from './contexts/DataContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	// <React.StrictMode>
		<DataProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</DataProvider>
	// </React.StrictMode>,
)
