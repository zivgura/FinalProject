import React, { useState } from 'react';
import OrganizationMeetingTable from '../meetings/OrganizationMeetingTable';
import Navbar from '../Navbar';
import Modal from '../modal/Modal';
import { deleteMeetingFromDB } from '../../services/server';

const ManageMeetingsPage = (props) => {
	const [state, setState] = useState({modalisOpen: false});
	const [channelState, setChannelState] = useState({channelName: ''});
	const organizationMeetings = props.history.location.state;

	const confirmDelete = async () => {
		await deleteMeetingFromDB(channelState.channelName);
		setState({modalisOpen: false});
	}

	const toggleModal = () => {
		setState(prevState => ({
			modalisOpen: !prevState.modalisOpen
		}));
	};

	return (
		<div className="page">
			<Navbar history={props.history}/>
			<h2 className="header">
				פגישות בארגון
			</h2>
			<OrganizationMeetingTable meetings={organizationMeetings} toggleModal={toggleModal} setChannelName={setChannelState}/>
			{state.modalisOpen ?
				<Modal
					text='שים/י לב'
					{...state}
					closeModal={confirmDelete}
				/>
				: null
			}
		</div>
	);
};

export default ManageMeetingsPage;