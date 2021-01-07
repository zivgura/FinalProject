import React, {useState} from "react";
import Select from "react-select";
import servicesList from "../resources/servicesList";
import Modal from "./Modal";


function AssignableUser(props) {
    const user = props.user;
    console.log("services")
    console.log(user.services)
    const services = user.services.map((dict) => {
        return {value: dict, label: dict}
    });
    console.log("services")
    console.log(services)
    const [userState, setUserState] = useState({
        service: '',
        modalisOpen:false,
        matches: []
    });


    async function getElderlyMatch() {
        return await fetch(`http://localhost:3001/responsible/assign/` +
            user.userName + "/" + userState.service.value,
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
        let elderlyMatch = await getElderlyMatch(user);
        // elderlyMatch = elderlyMatch.map((dic) => {
        //     return {
        //         elderly: dic.elderly,
        //         preferredDayElderly: dic.preferredDayElderly
        //     }
        // })
        console.log(elderlyMatch);
        setUserState({matches: elderlyMatch})
        // setResponsibleState({
        //     organizations: organizations,
        //     [event.target.name]: true
        // });
    }

    function toggleModal() {
        setUserState({
            modalisOpen: !userState.modalisOpen
        });
    }

    return (
        <li className="list-group-item" key={user.userName}>
            <div className="content">
                <div>
                    <label className="left">
                        {user.firstName}
                    </label>
                </div>
                <div>
                    <label className="right">
                        {/*סוג שירות*/}
                        <Select
                            name="organizationType"
                            value={userState.service}
                            options={services}
                            onChange={(value) => setUserState({service: value})}
                        />
                    </label>
                </div>
            </div>
            <div className="actions">
                <button onClick={() => onClick()}>Assign</button>
            </div>
            {userState.modalisOpen ?
                <Modal
                    text='Matches'
                    {...userState.matches.map((match)=>match.firstName)}
                    closeModal={toggleModal}
                />
                : null
            }
        </li>
    )
}

export default AssignableUser;