import React from "react";
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';


function Main() {
    return (
        <BrowserRouter basename="/Cool-Name/">
            <Routes/>
        </BrowserRouter>
    );

}

export default Main;
