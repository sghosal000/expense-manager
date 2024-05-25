import './App.css'
import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from './components/PrivateContent'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

import Demo from './pages/Demo'

// import { TransectionGraph } from './components/TransectionGraph'


function App() {
	const router = createBrowserRouter([
		{
			path: "/", element: <Layout />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/login", element: <Login /> },
				{ path: "/signup", element: <Signup /> },
				{ 
					element: <PrivateRoute />,
					children: [
						{ path: "/dashboard", element: <Dashboard />}
					]
				},
				{ path: "/demo", element: <Demo /> },
				
			]
		}
	])

	return <RouterProvider router={router} />
}

export default App
