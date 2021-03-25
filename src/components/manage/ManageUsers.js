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
		<div>
			<Navbar history={history}/>
			<div className="manage-wrapper">
				<div>
					ניהול מתנדבים
				</div>
				<div>
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
