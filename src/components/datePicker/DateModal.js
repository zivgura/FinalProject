import React from 'react';
import { DateTimePickerWrapper } from './dateAndTimePicker';

const DateModal = ({user, closeModal}) => {
	return (
		<div >
			<div className="modal-content">
				<div className="modal-title">בחר תאריך ושעה</div>
				<DateTimePickerWrapper user={user} closeModal={closeModal} />
			</div>
		</div>
	);
};

export { DateModal };