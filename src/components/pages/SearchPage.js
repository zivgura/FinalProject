import React from 'react';
import SearchInTable from '../users/SearchInTable';
import Navbar from '../Navbar';

const SearchPage = (props) => {
	const users = props.history.location.state;
	console.log("search page");
	console.log(props);
	return (
		<div className="page">
			<Navbar />
			<SearchInTable users={users}/>
		</div>
	);
};

export default SearchPage;