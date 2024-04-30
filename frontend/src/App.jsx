import './App.css'
import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PrivateRoute from './components/PrivateContent'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Layout />,
			children: [
				{ path: "/", element: <Home /> },
				{ path: "/login", element: <Login /> },
				{ path: "/signup", element: <Signup /> },
				{ 
					path: "/dashboard",
					element: (
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					)
				},
			]
		}
	])

	return <RouterProvider router={router} />
}

export default App
