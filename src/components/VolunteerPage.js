import React, {useEffect, useState} from "react";
import "../styles/page.css"
import Navbar from "./Navbar";


function VolunteerPage(props) {

    return (
        <div className="page">
            <Navbar/>
            <div className="buttons-section">
                <button
                    className="sb-btn"
                    type="button"
                    onClick={() => props.history.push("/volunteer/meetings")}>
                    פגישות
                </button>
            </div>
        </div>
    );
}

export default VolunteerPage;