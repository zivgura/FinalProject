import React, {useState, useRef} from "react";
import Select from "react-select";
import servicesList from "../resources/servicesList";
import Modal from "./Modal";
import UserView from "./UserView";
import UsersTable from "./UsersTable";


function AssignableUser(props) {
    const user = props.user;
    const [userState, setUserState] = useState({
        matches: [],
        isHidden: true,
        buttonText: "מצא קשישים מתאימים"
    });



    async function getElderlyMatch() {
        return await fetch(`http://localhost:3001/responsible/assign`,
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    volunteerUsername: user.userName,
                    volunteerServices: user.services,
                })
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
        console.log(user.services);
        let elderlyMatch = await getElderlyMatch(user);
        // elderlyMatch = elderlyMatch.map((dic) => {
        //     return {
        //         elderly: dic.elderly,
        //         preferredDayElderly: dic.preferredDayElderly
        //     }
        // })
        console.log(elderlyMatch);
        if(userState.isHidden){
            setUserState({
                matches: elderlyMatch,
                isHidden: false,
                buttonText: "הסתר טבלת התאמה"
            })
        }
        else {
            setUserState({matches: elderlyMatch, isHidden: true, buttonText: "מצא קשישים מתאימים"});
        }

        // setResponsibleState({
        //     organizations: organizations,
        //     [event.target.name]: true
        // });
    }



    return (
        <div>
            <li className="list-group-item" key={user.userName}>
                <div className="content">
                    <div>
                        <label className="volunteer-name">
                            {user.firstName}
                        </label>
                    </div>
                </div>
                <div className="actions">
                    <button
                        className="sb-btn"
                        name={user.userName}
                        onClick={() => onClick()}>
                        {userState.buttonText}
                    </button>
                </div>
            </li>
            <div>
                <UsersTable
                    users={userState.matches}
                    isHidden={userState.isHidden}/>
            </div>
        </div>
    )
}

export default AssignableUser;