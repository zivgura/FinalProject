import React from "react";

function AssignableUsers(props){
    // const volunteers = props.volunteers;
    const volunteers = [{userName: "ziv123", firstName:"Ziv"}];
    return(
        <div>
            <ul className="list-group">
                {volunteers.map((volunteer) => (
                    <li className="list-group-item" key={volunteer.userName}>
                        <div className="content">
                            {volunteer.firstName}
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