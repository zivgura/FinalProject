import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { addMeetingDB } from '../../services/server';
import Select from 'react-select';
import dateFormat from 'dateformat';
// import './DateTimePicker.css';

const DateTimePickerWrapper = ({user, closeModal}) => {
	const [state, setState] = useState({date: new Date(), wantedService: ''});

	const onClick = async () => {
		user.actualDate = dateFormat(state.date, 'dd.mm.yyyy,HH:MM');
		user.meetingSubject = state.wantedService.label;
		console.log(user);

		try {
			await addMeetingDB({user});
		}
		catch (error) {
			console.log(error);
		} finally {
			closeModal();
		}
	};
	return (
		<div className="modal-wrapper">
			<div className="modal-body">
				<div className="modal-preferred-days">
					<h4>ימים ושעות מועדפים משותפים:</h4>
					{user.commonPreferredDays.length > 0 ? user.commonPreferredDays.toString() : 'אין ימים ושעות מועדפים משותפים'}
				</div>
				<br/>
				<div className="field">
					<label>
						<h4>סוגי שירות אפשריים</h4>
						<Select
							placeholder="בחר/י..."
							isRtl
							name="wantedService"
							value={state.wantedService}
							options={user.commonServices.map((dic) => (
								{value: dic, label: dic}
							))}
							onChange={(value) => setState({...state, wantedService: value})}
						/>
					</label>
				</div>
				<br/>
				<DateTimePicker
					className="calender"
					calendarType={'Hebrew'}
					disableClock={true}
					value={state.date}
					onChange={(value) => setState({...state, date: value})}
					required={true}
				/>
			</div>

			<div className="modal-buttons">
				<button className="modal-btn" onClick={onClick}>אישור</button>
			</div>
		</div>
	);
};

export { DateTimePickerWrapper };