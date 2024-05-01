import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({loggedin, handleLogout}) => {
	return (
		<nav className="fixed top-0 left-0 w-full h-16 bg-base border-b-neutral shadow-lg flex items-center justify-between px-4">
			<h1 className="text-xl font-bold text-txt"><Link to="/">TrackIt</Link></h1>

			{!loggedin ?
				<ul className="flex space-x-4">
					<li className="text-txt-depressed font-medium hover:text-accent hover:font-bold cursor-pointer"><Link to="/login">Login</Link></li>
					<li className="text-txt-depressed font-medium hover:text-accent hover:font-bold cursor-pointer"><Link  to="/signup">Signup</Link></li>
				</ul> :
				<ul className="flex space-x-4">
					<li className="text-txt-depressed font-medium hover:text-accent hover:font-bold cursor-pointer"><Link to="/dashboard">Dashboard</Link></li>
					<li className="text-txt-depressed font-medium hover:text-accent hover:font-bold cursor-pointer" onClick={() => handleLogout()}>Logout</li>
				</ul>}

		</nav>
	);
};

export default Navbar;
