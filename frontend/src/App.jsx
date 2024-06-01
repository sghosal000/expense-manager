import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PersistLogin from './components/PersistLogin'
import PrivateRoute from './components/PrivateContent'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'


function App() {
	const router = createBrowserRouter([
		{
			path: "/", element: <Layout />,
			children: [
				{
					element: <PersistLogin />,
					children: [
						{ path: "/", element: <Home /> },
						{ path: "/login", element: <Login /> },
						{ path: "/signup", element: <Signup /> },
						{
							element: <PrivateRoute />,
							children: [
								{ path: "/dashboard", element: <Dashboard /> }
							]
						},
					]
				}

			]
		}
	])

	return <RouterProvider router={router} />
}

export default App
