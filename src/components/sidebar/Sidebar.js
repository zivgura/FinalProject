import React from 'react';
import * as Cookies from 'js-cookie';
import { ws } from '../LoginForm';
import logo from '../../resources/logo.png';
import './sidebar.css';

function Sidebar({history, content}) {
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
		<div className="sidebar">
			<div className="top-sidebar">
				<div className="right">
				</div>
				<div className="left">
					<button className="nav-buttons" onClick={onClick}>התנתק</button>
				</div>
			</div>
			{content}
		</div>
	);
}

export default Sidebar;