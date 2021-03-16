import React from 'react';
import AssignableUsers from '../users/AssignableUsers';
import Navbar from '../Navbar';

function ManageUsers({history}) {
	const state = history.location.state;

	return (
		<div>
			<Navbar/>
			<div className="manage-wrapper">
				<div>
					<AssignableUsers users={state.users}/>
				</div>
			</div>
		</div>

	);
}

export default ManageUsers;
