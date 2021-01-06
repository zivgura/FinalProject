import React from "react";
import "./manage.css";

function AssignableUsers(props){
    const users = props.users;
    // const users = [{userName: "ziv123", firstName:"Ziv"}];
    return(
        <div>
            <ul className="list-group">
                {users.map((user) => (
                    <li className="list-group-item" key={user.userName}>
                        <div className="content">
                            {user.firstName}
                        </div>
                        <div className="actions">
                            <button>Assign</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default AssignableUsers;