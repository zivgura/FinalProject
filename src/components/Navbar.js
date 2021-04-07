import React from 'react';
import logo from '../resources/Milbat-logo.png';
import * as Cookies from 'js-cookie';

function Navbar({history}) {
	const onClick = () => {
		Cookies.remove('userName');
		history.push('/login');
	}

	return (
		<div className="navbar">
			<button className="nav-buttons" onClick={onClick}>התנתק</button>
			<div className="logo">
				<img src={logo} alt={''}/>
			</div>
			<div className="app-logo">

			</div>
		</div>
	);
}

export default Navbar;