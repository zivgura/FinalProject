import React from 'react';
import SearchInTable from '../users/SearchInTable';
import Navbar from '../Navbar';

const AdminSearchPage = (props) => {
	const volunteersUsers = props.history.location.state.volunteersUsers;
	const elderlyUsers = props.history.location.state.elderlyUsers;

	return (
		<div className="page">
			<Navbar history={props.history}/>
			<div className="search-wrapper">
				<h2 className="header">
					מתנדבים
				</h2>
				<SearchInTable users={volunteersUsers}/>
				<h2 className="header">
					קשישים
				</h2>
				<SearchInTable users={elderlyUsers}/>
			</div>
		</div>
	);
};

export default AdminSearchPage;