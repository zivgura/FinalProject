import React from 'react';
import Navbar from '../Navbar';

const AfterVideoCallPage = (props) => {
	const feedbackURL = 'https://forms.gle/mCABoh5EteuNEceH8';

	return (
		<div className="page">
			<Navbar history={props.history}/>
			<div className="manage-wrapper">
				<h2 className="header">משוב</h2>
				אנא מלא/י משוב על השיחה
				<a className="sb-btn" href={feedbackURL}>לחץ כאן</a>
			</div>
		</div>
	);
};

export default AfterVideoCallPage;
