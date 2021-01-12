import React, {useEffect, useState} from "react";
import "../styles/page.css"
import Navbar from "./Navbar";

function AdminPage(props) {
    const [adminState, setAdminState] = useState({organizations: []});

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


    async function onClick() {
        let organizations = await getOrganizationsNames();

        organizations = organizations.map((dic) => {
            return {value: dic.organizationName, label: dic.organizationName}
        })
        console.log(organizations);
        setAdminState({organizations: organizations});

    }

    useEffect(() => {

        if (adminState.organizations.length !== 0) {
            console.log(adminState.organizations);
            props.history.push("/admin/register-responsible", adminState.organizations);
            //HISTORY!
        }
    });

    return (
        <div className="page">
            <Navbar organizationName={"Admin"}/>
            <div className="buttons-section">
                <button
                    className="sb-btn"
                    type="button"
                    onClick={() => props.history.push("/admin/register-organization")}>
                    צור ארגון חדש
                </button>
                <button
                    className="sb-btn"
                    type="button"
                    onClick={onClick}>
                    צור אחראי חדש
                </button>
            </div>
        </div>
    );
}

export default AdminPage;