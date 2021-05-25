import React from 'react';
import { ws } from './LoginForm';
import logo from '../resources/Milbat-logo.png';
import * as Cookies from 'js-cookie';

function Navbar({history}) {
	const onClick = () => {
		if (ws) {
			ws.close();
		}
		Cookies.remove('userName');
		Cookies.remove('organizationName');
		Cookies.remove('organizationType');
		history.push('/login');
	};

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