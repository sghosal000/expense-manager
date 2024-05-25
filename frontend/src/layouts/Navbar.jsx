import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
	const { user, afterLogout } = useAuth()

	return (
		// <nav className="fixed top-0 left-0 w-full h-16 z-20 bg-gradient-to-t from-neutral to-5% to-base border-b-neutral shadow-xl flex items-center justify-between px-4">
		<nav className="fixed top-0 left-0 w-full h-16 z-20 bg-background/50 backdrop-blur-sm border-b-neutral shadow-xl flex items-center justify-between px-4">
			<h1 className="text-xl font-bold text-txt"><Link to="/">TrackIt</Link></h1>

			{!user?.username?
				<ul className="flex">
					<li className="px-2 py-1 rounded-lg text-txt-depressed font-medium hover:text-accent hover:bg-base hover:highlight-white cursor-pointer transition-all"><Link to="/login">Login</Link></li>
					<li className="px-2 py-1 rounded-lg text-txt-depressed font-medium hover:text-accent hover:bg-base hover:highlight-white cursor-pointer transition-all"><Link to="/signup">Signup</Link></li>
					{/* <li className="px-2 py-1 rounded-lg text-txt-depressed font-medium hover:text-accent hover:bg-base hover:highlight-white cursor-pointer transition-all"><Link to="/dashboard">Dashboard</Link></li> */}
				</ul> :
				<ul className="flex">
					<li className="px-2 py-1 rounded-lg text-txt-depressed font-medium hover:text-accent hover:bg-base hover:highlight-white cursor-pointer transition-all"><Link to="#">Hello, {user.fname}</Link></li>
					<li className="px-2 py-1 rounded-lg text-txt-depressed font-medium hover:text-accent hover:bg-base hover:highlight-white cursor-pointer transition-all"><Link to="/dashboard">Dashboard</Link></li>
					<li className="px-2 py-1 rounded-lg text-txt-depressed font-medium hover:text-accent hover:bg-base hover:highlight-white cursor-pointer transition-all" onClick={() => afterLogout()}>Logout</li>
				</ul>
			}
		</nav>
	);
};

export default Navbar;
