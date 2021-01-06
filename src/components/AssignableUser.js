import React, {useState} from "react";
import Select from "react-select";
import AssignableUsers from "./AssignableUsers";


function AssignableUser(props) {
    const user = props.user;
    const services = {value:user.services, label:user.services};
    // const services = user.services.map((dict)=> {return {value:dict.value, label:dict.value}});
    const [userState,setUserState] = useState({service:''});


    async function getElderlyMatch() {
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
        <li className="list-group-item" key={user.userName}>
            <div className="content">
                <div>
                    {user.firstName}
                </div>
                <div>
                    <label>
                        סוג שירות
                        <Select
                            name="organizationType"
                            value={[]}
                            options={services}
                            onChange={(value) => setUserState({service: value.value})}
                        />
                    </label>
                </div>
            </div>
            <div className="actions">
                <button onClick={() => onClick()}>Assign</button>
            </div>
        </li>
    )
}

export default AssignableUser;