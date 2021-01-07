import React from "react";
import "./manage.css";
import AssignableUser from "./AssignableUser";

function AssignableUsers(props) {
    const users = props.users;
    console.log("props");
    console.log(props);
    console.log("props.users");
    console.log(props.users);

    // const users = [{userName: "ziv123", firstName:"Ziv"}];

    async function getElderlyMatch(user) {
        return await fetch(`http://localhost:3001/responsible/assign/` +
            user.userName +"/"+ user.services,
            {
                method: 'get',
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let volunteers = (data);
                return volunteers;
            })
    }

    async function onClick() {
        const user = users[0];
        let elderlyMatch = await getElderlyMatch(user);
        // elderlyMatch = elderlyMatch.map((dic) => {
        //     return {
        //         elderly: dic.elderly,
        //         preferredDayElderly: dic.preferredDayElderly
        //     }
        // })
        console.log(elderlyMatch);
        // setResponsibleState({
        //     organizations: organizations,
        //     [event.target.name]: true
        // });
    }

    return (
        <div>
            <ul className="list-group">
                {users.map((user) => (
                    <AssignableUser user={user}/>
                ))}
            </ul>
        </div>
    )
}

export default AssignableUsers;