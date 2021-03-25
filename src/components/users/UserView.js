import React from 'react';
import '../manage/manage.css';

function UserView({toggleModal, user, setUser}) {
	const setModal = () => {
		setUser(user);
		toggleModal();
	};

	return (
		<React.Fragment>
			<td className="col-1">{user.elderly.firstName}</td>
			<td className="col-2">{user.preferredDay}</td>
			<td className="col-3">{user.finalRank * 100 + '%'}</td>
			<td className="col-4">
				<button
					className="table-button"
					type="button"
					onClick={setModal}>
					בחר
				</button>
			</td>
		</React.Fragment>
	);
}

export default UserView;