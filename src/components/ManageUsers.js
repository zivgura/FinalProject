import React, {useState, useEffect} from "react";

function ManageUsers(props){
    return(
        <div>
            {props.history.location.state}
        </div>
    )
}
export default ManageUsers;
