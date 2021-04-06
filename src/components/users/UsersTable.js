import UserView from './UserView';
import React from 'react';

function UsersTable({users, isHidden, toggleModal, setUser}) {
	if (!isHidden) {
		return (
			<div>
				<table className="users-table">
					<thead className="table-header">
					<tr>
						<th className="col-4">צור פגישה</th>
						<th className="col-3">אחוזי התאמה</th>
						<th className="col-2">יום ושעה מועדפים</th>
						<th className="col-1">שם פרטי</th>
					</tr>
					</thead>
					<tbody>
					{users.map((user) => (
						<tr key={user} className="table-row">
							<UserView user={user} toggleModal={toggleModal} setUser={setUser}/>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		);
	}
	else {
		return (
			<div className="no-data">
			</div>
		);
	}
}

export default UsersTable;