import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { DataCProvider } from './contexts/DataContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<DataCProvider>
			<App />
		</DataCProvider>
	</React.StrictMode>,
)
