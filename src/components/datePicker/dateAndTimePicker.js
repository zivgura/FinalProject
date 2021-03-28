import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { addMeetingDB } from '../../services/server';

const DateTimePickerWrapper = ({user, closeModal}) => {
	const [value, onChange] = useState(new Date());

	const onClick = async () => {
		user.actualDate = value.toLocaleDateString() + ' ' + value.toLocaleTimeString();
		console.log();

		try {
			await addMeetingDB({user});
		}
		catch (error) {
			console.log(error);
		}

		closeModal();
	};
	return (
		<div className="modal-wrapper">
			<div className="modal-body">
				<DateTimePicker
					calendarType={'Hebrew'}
					disableClock={true}
					value={value}
					onChange={onChange}
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