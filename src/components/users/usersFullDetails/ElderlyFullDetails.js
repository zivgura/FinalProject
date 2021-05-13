import React from 'react';
import './full-details.css';

const ElderlyFullDetails = ({details}) => {
	console.log(details);
	return (
		<div className="full-page-container">
			<h2>פרטים מלאים של הקשיש</h2>
			<div className="full-page-wrapper">
				<div className="details-list">
					<div className="field">
						<div className="field-label">
							שם מלא:
						</div>
						<div className="field-value">
							{details.firstName + ' ' + details.lastName}
						</div>
					</div>
					<div className="field">
						מגדר:
						{details.gender}
					</div>
					<label>
						שם הארגון אליו משתייך:
						{details.organizationName}
					</label>
					<label>
						תעודת זהות:
						{details.userName}
					</label>
					<label>
						כתובת מייל:
						{details.email}
					</label>
					<label>
						מספר טלפון:
						{details.phoneNumber}
					</label>
					<label>
						שנת לידה:
						{details.birthYear}
					</label>
					<label>
						עיר מגורים:
						{details.city}
					</label>
					<label>
						שפות:
						{details.languages.toString()}
					</label>
					<label>
						תחומי עניין:
						{details.areasOfInterest.toString()}
					</label>
					<label>
						מכשירים דיגיטליים ברשותו ורמת הידע בהם:
						{details.digitalDevices.toString()}
					</label>
					<label>
						ימים מועדפים לשיחות:
						{details.preferredDays.toString()}
					</label>
					<label>
						מידע נוסף:
						{details.additionalInformation}
					</label>
					<label>
						סוגי שירות רצויים:
						{details.services.toString()}
					</label>
				</div>
			</div>
		</div>
	);
};

export default ElderlyFullDetails;