import React from "react";
import AssignableUsers from "./AssignableUsers";
import Navbar from "./Navbar";

function ManageUsers(props) {
    const state = props.history.location.state;
    console.log("manage users state");
    console.log(state);
    return (
        <div>
            <Navbar/>
            <div className="manage-wrapper">
                {/*<div>*/}
                {/*    שם ארגון נוכחי*/}
                {/*    {state.organizationName}*/}
                {/*</div>*/}
                <div>
                    <AssignableUsers users={state.users}/>
                </div>
            </div>
        </div>

    )
}

export default ManageUsers;
