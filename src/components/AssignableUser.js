import React, { useState } from 'react';
import UsersTable from './UsersTable';
import { fetchElderlyMatches } from '../services/server';


function AssignableUser({user}) {
	const [userState, setUserState] = useState({
		matches: [],
		isHidden: true,
		buttonText: 'מצא קשישים מתאימים'
	});

	async function getElderlyMatch() {
		const response = await fetchElderlyMatches(user);
		return response.json();
	}

	async function onClick() {
		console.log(user.services);
		let elderlyMatch = await getElderlyMatch();
		// elderlyMatch = elderlyMatch.map((dic) => {
		//     return {
		//         elderly: dic.elderly,
		//         preferredDayElderly: dic.preferredDayElderly
		//     }
		// })
		console.log(elderlyMatch);
		if (userState.isHidden) {
			setUserState({
				matches: elderlyMatch,
				isHidden: false,
				buttonText: 'הסתר טבלת התאמה'
			});
		}
		else {
			setUserState({matches: elderlyMatch, isHidden: true, buttonText: 'מצא קשישים מתאימים'});
		}

		// setResponsibleState({
		//     organizations: organizations,
		//     [event.target.name]: true
		// });
	}

	return (
		<div>
			<li className="list-group-item" key={user.userName}>
				<div className="content">
					<div>
						<label className="volunteer-name">
							{user.firstName}
						</label>
					</div>
				</div>
				<div className="actions">
					<button
						className="sb-btn"
						name={user.userName}
						onClick={() => onClick()}>
						{userState.buttonText}
					</button>
				</div>
			</li>
			<div>
				<UsersTable
					users={userState.matches}
					isHidden={userState.isHidden}/>
			</div>
		</div>
	);
}

export default AssignableUser;
