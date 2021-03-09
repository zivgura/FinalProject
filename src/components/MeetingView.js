import React from 'react';
import '../styles/manage.css';
import {addMeetingDB} from "../services/server";
function MeetingView({meeting}) {

    return (
        <React.Fragment>
            <td className="col-1">{meeting.label}</td>
            <td className="col-2">{meeting.value}</td>
        </React.Fragment>
    );
}
export default MeetingView;