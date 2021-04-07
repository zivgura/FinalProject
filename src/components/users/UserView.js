import React, { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import checkIcon from '../../resources/check-logo.png';
import '../manage/manage.css';

function UserView({toggleModal, user, setUser}) {
	const setModal = () => {
		setUser(user);
		toggleModal();
	};

	useEffect(() => {
		ReactTooltip.rebuild();
	}, [user]);

	return (
		<React.Fragment>
			<td className="col-4">
				<button className="check-icon-button">
					<img src={checkIcon} alt="v" onClick={setModal}/>
				</button>
			</td>
			<td className="col-3">
				<p data-tip="" data-for="tooltip">
					{user.finalRank * 100 + '%'}
				</p>
				<ReactTooltip id="tooltip" getContent={() => {
					return (
						<div className="tooltip">
							{'תחומי עניין משותפים: ' + user.commonAreaOfInterest.toString()}
							<br/>
							{'שפות משותפות: ' + user.commonLanguages.toString()}
							<br/>
							{'ימים ושעות מועדפים משותפים: ' + user.commonPreferredDays.toString()}
							<br/>
							{'מגדר מועדף על הקשיש: ' + user.preferredGender.toString()}
						</div>
					);
				}}/>
			</td>
			<td className="col-2">{user.preferredDay}</td>
			<td className="col-1">{user.elderly.firstName}</td>
		</React.Fragment>
	);
}

export default UserView;