import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { addMeetingDB } from '../../services/server';

const DateTimePickerWrapper = ({user, closeModal}) => {
	const [value, onChange] = useState(new Date());

	const onClick = async () => {
		user.actualDate = value.toLocaleDateString() +' '+ value.toLocaleTimeString();
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
			<DateTimePicker
				value={value}
				onChange={onChange}
			/>
			<button className="modal-btn" onClick={onClick}>אישור</button>
		</div>
	);
};

export { DateTimePickerWrapper };