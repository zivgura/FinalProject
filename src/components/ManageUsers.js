import React from "react";
import AssignableUsers from "./AssignableUsers";

function ManageUsers(props){
    const state = props.history.location.state;
    return(
        <div>
            <div>
            שם ארגון נוכחי
            {state.organizationName}
            </div>
            <div>
                <AssignableUsers volunteers={state.users} />
            </div>
        </div>
    )
}
export default ManageUsers;
