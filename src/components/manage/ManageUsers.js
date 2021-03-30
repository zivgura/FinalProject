import React, { useState } from 'react';
import AssignableUsers from '../users/AssignableUsers';
import Navbar from '../Navbar';
import { DateModal } from '../datePicker/DateModal';

function ManageUsers({history}) {
	const state = history.location.state;
	const [user, setUser] = useState();
	const [modalState, setModalState] = useState({modalIsOpen: false});

	const toggleModal = () => {
		setModalState({modalIsOpen: !modalState.modalIsOpen});
	};

	return (
		<div className="page">
			<Navbar history={history}/>
			<div>
				<h2 className="header">
					קביעת פגישות למתנדבים
				</h2>
			</div>
			<div className="manage-wrapper">
				<div className="scrollable">
					<AssignableUsers users={state.users} toggleModal={toggleModal} setUser={setUser}/>
				</div>
			</div>
			<div>
				{modalState.modalIsOpen ?
					<DateModal
						user={user}
						closeModal={toggleModal}
					/>
					: null
				}
			</div>
		</div>

	);
}

export default ManageUsers;
