import React from 'react';
import '../styles/manage.css';
import {addMeetingDB} from "../services/server";
function UserView({user}) {

	async function addMeeting() {
		await addMeetingDB({user});
	}

	return (
		<React.Fragment>
			<td className="col-1">{user.elderly.firstName}</td>
			<td className="col-2">{user.preferredDay}</td>
			<td className="col-3">{user.finalRank * 100 + '%'}</td>
			<td className="col-4"><form><input type="button" onClick={()=>addMeeting()} value="לחץ"/></form></td>
		</React.Fragment>
	);
}

export default UserView;