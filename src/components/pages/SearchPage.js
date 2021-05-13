import React from 'react';
import SearchInTable from '../users/SearchInTable';
import Navbar from '../Navbar';

const SearchPage = (props) => {
	const users = props.history.location.state;

	return (
		<div className="page">
			<Navbar history={props.history}/>
			<SearchInTable history={props.history} users={users}/>
		</div>
	);
};

export default SearchPage;
