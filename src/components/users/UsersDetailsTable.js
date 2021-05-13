import React from 'react';
import { Button } from 'react-bootstrap';

function UsersDetailsTable({history, users}) {
	const onClick = (user) => {
		history.push('/responsible/full-details/elderly', user);
	};

	return (
		<div>
			<table className="users-table">
				<thead className="table-header">
				<tr>
					<th className="col-4">מספר טלפון</th>
					<th className="col-3">אימייל</th>
					<th className="col-2">תעודת זהות</th>
					<th className="col-1">שם ושם משפחה</th>
				</tr>
				</thead>
				<tbody>
				{users.map((user, index) => (
					<tr key={index} className="table-row">
						<td className="col-4">
							{user.phoneNumber}
						</td>
						<td className="col-3">
							{user.email}
						</td>
						<td className="col-2">
							{user.userName}
						</td>
						<td className="col-1">
							<Button className="hidden-btn" onClick={() => onClick(user)}>
								{user.firstName + ' ' + user.lastName}
							</Button>
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	);
}

export default UsersDetailsTable;
