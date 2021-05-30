import React from 'react';
import { ws } from '../LoginForm';
import * as Cookies from 'js-cookie';
import './navbar.css';

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
			<button className="nav-buttons" onClick={history.goBack}>חזור</button>
		</div>
	);
}

export default Navbar;