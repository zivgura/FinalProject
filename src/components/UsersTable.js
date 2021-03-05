import UserView from "./UserView";
import React from "react";

function UsersTable({users, isHidden}) {
    if(!isHidden) {
        return (
            <table className="users-table">
                <thead className="table-header">
                <th className="col-1">שם פרטי</th>
                <th className="col-2">יום ושעה מועדפים</th>
                <th className="col-3">אחוזי התאמה</th>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user} className="table-row">
                        <UserView user={user}/>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }
    else{
        return(
            <div className="no-data">
            </div>
        )
    }
}

export default UsersTable;