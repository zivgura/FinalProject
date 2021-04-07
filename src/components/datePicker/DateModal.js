import React from 'react';
import { DateTimePickerWrapper } from './dateAndTimePicker';
import './date-modal.css';

const DateModal = ({user, closeModal}) => {
	return (
		<div className="modal">
			<div className="modal-content">
				<div className="modal-title">
					<span>
					בחר תאריך ושעה
					</span>
				</div>
				<DateTimePickerWrapper user={user} closeModal={closeModal}/>
			</div>
		</div>
	);
};

export { DateModal };