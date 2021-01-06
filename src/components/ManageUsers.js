import React from "react";
import AssignableUsers from "./AssignableUsers";

function ManageUsers(props){
    const state = props.history.location.state;
    console.log("manage users state");
    console.log(state);
    return(
        <div>
            <div>
            שם ארגון נוכחי
            {state.organizationName}
            </div>
            <div>
                <AssignableUsers users={state.users} />
            </div>
        </div>
    )
}
export default ManageUsers;
