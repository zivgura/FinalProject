import React, { useState } from 'react';
import UsersDetailsTable from './UsersDetailsTable';

const SearchInTable = ({users}) => {
	const [state, setState] = useState({
		filteredUsers: users
	});

	const search = (e) => {
		let filteredUsers = users.filter(user => user.userName.includes(e.target.value) || user.firstName.includes(e.target.value)
			|| user.lastName.includes(e.target.value));
		console.log(filteredUsers);
		setState({filteredUsers:filteredUsers});
	};

	return (
		<div className="meeting-wrapper">
			<input
				placeholder="חפש שם או תעודת זהות..."
				onChange={e => search(e)}
			/>
			<div className="scrollable">
				<UsersDetailsTable users={state.filteredUsers}/>
			</div>
		</div>
	);
};

export default SearchInTable;