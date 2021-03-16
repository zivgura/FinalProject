import React from 'react';
import logo from '../resources/Milbat-logo.png';

function Navbar() {
	return (
		<div className="navbar">
			<button className="nav-buttons">התנתק</button>
			<div className="logo">
				<img src={logo} alt={''}/>
			</div>
			<div className="app-logo">

			</div>
		</div>
	);
}

export default Navbar;