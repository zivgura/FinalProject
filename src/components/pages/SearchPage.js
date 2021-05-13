import React from 'react';
import SearchInTable from '../users/SearchInTable';
import Navbar from '../Navbar';

const SearchPage = (props) => {
	const users = props.history.location.state.users;
	const usersType =  props.history.location.state.usersType;

	return (
		<div className="page">
			<Navbar history={props.history}/>
			<SearchInTable history={props.history} users={users} usersType={usersType}/>
		</div>
	);
};

export default SearchPage;
