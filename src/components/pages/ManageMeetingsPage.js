import React, { useEffect, useState } from 'react';
import OrganizationMeetingTable from '../meetings/OrganizationMeetingTable';
import Navbar from '../Navbar';
import Modal from '../modal/Modal';
import { deleteMeetingFromDB } from '../../services/server';

const ManageMeetingsPage = (props) => {
	const organizationMeetings = props.history.location.state;
	const [state, setState] = useState({modalisOpen: false});
	const [channelState, setChannelState] = useState({channelName: ''});
	const [meetingsState, setMeetingsState] = useState({meetings: organizationMeetings});

	const deleteFromUI = (channelNameToDelete) => {
		setMeetingsState({meetings: meetingsState.meetings.filter(meeting => meeting.channelName !== channelNameToDelete)});
	}

	const confirmDelete = async () => {
		await deleteMeetingFromDB(channelState.channelName);
		deleteFromUI(channelState.channelName);
		setState({modalisOpen: false});
	}

	const toggleModal = () => {
		setState(prevState => ({
			modalisOpen: !prevState.modalisOpen
		}));
	};

	let meetingsComponent = (
		<OrganizationMeetingTable
			meetings={meetingsState.meetings}
			setMeetings={setMeetingsState}
			toggleModal={toggleModal}
			setChannelState={setChannelState}/>
	)

	useEffect(() => {
		meetingsComponent = (
			<OrganizationMeetingTable
				meetings={meetingsState.meetings}
				setMeetings={setMeetingsState}
				toggleModal={toggleModal}
				setChannelState={setChannelState}/>
		)
	}, [meetingsState])

	return (
		<div className="page">
			<Navbar history={props.history}/>
			<h2 className="header">
				פגישות בארגון
			</h2>
			{meetingsComponent}
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