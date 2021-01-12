import React from "react";
import "../styles/manage.css"

function UserView(props) {
    const user = props.user;

    return (
        <React.Fragment>
            <td className="col-1">{user.elderly.firstName}</td>
            <td className="col-2">{user.preferredDay}</td>
            <td className="col-3">{user.finalRank*100+"%"}</td>
        </React.Fragment>
    )
}

export default UserView;