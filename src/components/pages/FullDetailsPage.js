import React from 'react';
import ElderlyFullDetails from '../users/usersFullDetails/ElderlyFullDetails';
import VolunteerFullDetails from '../users/usersFullDetails/VolunteerFullDetails';
import Navbar from '../Navbar';

const FullDetailsPage = (props) => {
	const details = props.history.location.state.details;
	const usersType = props.history.location.state.usersType;
	console.log(details);
	return (
		<div className="page">
			<Navbar history={props.history}/>
			<div className="full-page-container">
				<h2>פרטים מלאים</h2>
				{
					usersType === 'קשישים'
						? <ElderlyFullDetails details={details} />
						: <VolunteerFullDetails details={details} />
				}
			</div>
		</div>
	);
};

export default FullDetailsPage;
