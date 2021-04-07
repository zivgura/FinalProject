import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { addMeetingDB } from '../../services/server';
import Select from 'react-select';
import { servicesList } from '../../resources/lists';
// import './DateTimePicker.css';

const DateTimePickerWrapper = ({user, closeModal}) => {
	const [state, setState] = useState({date: new Date(), wantedService: ''})

	const onClick = async () => {
		user.actualDate = state.date.toLocaleDateString() + ' ' + state.date.toLocaleTimeString();
		user.meetingSubject = state.wantedService.label;
		console.log(user.actualDate);
		console.log(user.meetingSubject);

		try {
			await addMeetingDB({user});
		}
		catch (error) {
			console.log(error);
		}
		finally {
			closeModal();
		}
	};
	return (
		<div className="modal-wrapper">
			<div className="modal-body">
				<DateTimePicker
					className="calender"
					calendarType={'Hebrew'}
					disableClock={true}
					value={state.date}
					onChange={(value) => setState({...state,date: value})}
					required={true}
				/>
			<div className="field">
				<label>
					סוגי שירות רצויים
					<Select
						placeholder="בחר/י..."
						isRtl
						name="wantedService"
						value={state.wantedService}
						options={servicesList}
						onChange={(value) => setState({...state,wantedService: value})}
					/>
				</label>
			</div>
			</div>

			<div className="modal-buttons">
				<button className="modal-btn" onClick={onClick}>אישור</button>
			</div>
		</div>
	);
};

export { DateTimePickerWrapper };