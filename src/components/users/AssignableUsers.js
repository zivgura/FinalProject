import React from 'react';
import '../manage/manage.css';
import AssignableUser from './AssignableUser';

function AssignableUsers({users}) {
	return (
		<div>
			<ul className="list-group">
				{users.map((user) => (
					<AssignableUser key={user.userName} user={user}/>
				))}
			</ul>
		</div>
	);
}

export default AssignableUsers;