import React from 'react';
import { addMeetingDB } from '../../services/server';
import '../manage/manage.css';

function UserView({user}) {

	async function addMeeting() {
		await addMeetingDB({user});
	}

	return (
		<React.Fragment>
			<td className="col-1">{user.elderly.firstName}</td>
			<td className="col-2">{user.preferredDay}</td>
			<td className="col-3">{user.finalRank * 100 + '%'}</td>
			<td className="col-4">
				<button
					className="table-button"
					type="button"
					onClick={addMeeting}>
					בחר
				</button>
			</td>
		</React.Fragment>
	);
}

export default UserView;