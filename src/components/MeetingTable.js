import React from "react";
import Select from "react-select";
import MeetingView from "./MeetingView";

function MeetingTable(props) {

    let meetings = props.history.location.state
    return (
            <table className="users-table">
                <thead className="table-header">
                <th className="col-1">קשיש</th>
                <th className="col-2">פגישה</th>
                </thead>
                <tbody>
                {meetings.map((meeting) => (
                    <tr key={meeting} className="table-row">
                        <MeetingView meeting={meeting}/>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

export default MeetingTable;