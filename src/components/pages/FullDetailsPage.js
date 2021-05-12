import React from 'react';
import ElderlyFullDetails from '../users/ElderlyFullDetails';
import Navbar from '../Navbar';

const FullDetailsPage = (props) => {
	const details = props.history.location.state;

	return (
		<div className="page">
			<Navbar history={props.history}/>
			<ElderlyFullDetails details={details} />
		</div>
	);
};

export default FullDetailsPage;
