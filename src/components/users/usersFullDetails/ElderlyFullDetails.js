import React from 'react';
import './full-details.css';
import { prettifyStringArray } from '../../../ClientUtils';

const ElderlyFullDetails = ({details}) => (
	<div className="full-page-wrapper">
		<div className="details-list">
			{'פרטי הקשיש:'}
			<div className="container">
				<div className="field">
					<div className="field-label">
						שם מלא:
					</div>
					<div className="field-value">
						{details.firstName + ' ' + details.lastName}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						מגדר:
					</div>
					<div className="field-value">
						{details.gender}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						שם הארגון אליו משתייך:
					</div>
					<div className="field-value">
						{details.organizationName}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						תעודת זהות:
					</div>
					<div className="field-value">
						{details.userName}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						כתובת מייל:
					</div>
					<div className="field-value">
						{details.email}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						מספר טלפון:
					</div>
					<div className="field-value">
						{details.phoneNumber}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						שנת לידה:
					</div>
					<div className="field-value">
						{details.birthYear}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						עיר מגורים:
					</div>
					<div className="field-value">
						{details.city}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						שפות:
					</div>
					<div className="field-value">
						{prettifyStringArray(details.languages)}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						תחומי עניין:
					</div>
					<div className="field-value">
						{prettifyStringArray(details.areasOfInterest)}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						מכשירים בבעלותו ורמת השליטה:
					</div>
					<div className="field-value">
						{prettifyStringArray(details.digitalDevices)}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						ימים מועדפים לשיחות:
					</div>
					<div className="field-value">
						{prettifyStringArray(details.preferredDays)}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						מעדיף לדבר עם:
					</div>
					<div className="field-value">
						{details.genderToMeetWith}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						סוגי שירות רצויים:
					</div>
					<div className="field-value">
						{prettifyStringArray(details.wantedServices)}
					</div>
				</div>
				<div className="field">
					<div className="field-label">
						מידע נוסף:
					</div>
					<div className="field-value">
						{details.additionalInformation ? details.additionalInformation : '-'}
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default ElderlyFullDetails;