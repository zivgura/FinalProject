import React, {useEffect, useState} from "react";
import * as ClientUtils from "../ClientUtils";
import Navbar from "./Navbar";

function ResponsiblePage(props) {
    const [responsibleState, setResponsibleState] = useState({
        organizations: [],
        users: [],
        isVolunteerClicked: false,
        isElderlyClicked: false,
        isManageVolunteersClicked: false
    });

    async function getOrganizationsNames() {
        return await fetch(`http://localhost:3001/admin/organizationNames`, {
            method: 'get',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                let user = (data);
                return user;
            })
    }

    async function getVolunteers() {
        return await fetch(`http://localhost:3001/responsible/volunteersDetails/` + new URLSearchParams(
            props.history.location.state),
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

    async function onClick(event) {
        let organizations = await getOrganizationsNames();
        organizations = organizations.map((dic) => {
            return {value: dic.organizationName, label: dic.organizationName}
        })
        console.log(organizations);
        setResponsibleState({
            organizations: organizations,
            [event.target.name]: true
        });
    }

    async function onClickManageVolunteers(event) {
        let volunteers = await getVolunteers();
        volunteers = ClientUtils.convertVolunteerDetailsFromDB(volunteers);
        console.log("volunteers");
        console.log(volunteers);
        setResponsibleState({
            users: volunteers,
            [event.target.name]: true
        });
    }


    useEffect(() => {
        if (responsibleState.isVolunteerClicked) {
            console.log(responsibleState.organizations);
            props.history.push("/responsible/register-volunteer", responsibleState.organizations);
            //HISTORY!
        } else if (responsibleState.isElderlyClicked) {
            console.log(responsibleState.organizations);
            props.history.push("/responsible/register-elderly", responsibleState.organizations);
            //HISTORY!
        } else if (responsibleState.isManageVolunteersClicked) {
            props.history.push("/responsible/manage-volunteers", {
                organizationName: props.history.location.state,
                users: responsibleState.users
            });
            //HISTORY!
        }
    });

    return (
        <div className="page">
            <Navbar organizationName={props.history.location.state}/>
            <div className="buttons-section">
                <button
                    className="sb-btn"
                    name="isVolunteerClicked"
                    type="button"
                    onClick={(e) => onClick(e)}
                >
                    צור מתנדב חדש
                </button>
                <button
                    className="sb-btn"
                    name="isElderlyClicked"
                    type="button"
                    onClick={(e) => onClick(e)}
                >
                    צור קשיש חדש
                </button>
                <button
                    className="sb-btn"
                    name="isManageVolunteersClicked"
                    type="button"
                    onClick={(e) => onClickManageVolunteers(e)}
                >
                    נהל מתנדבים
                </button>
            </div>
        </div>
    )
}

export default ResponsiblePage;