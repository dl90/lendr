import React from 'react';
import './index.scss';
import './app.scss';
import './tutorial3.scss';

import Header from '../comps/Header';
import Button from '../comps/Button';

import {Link} from "react-router-dom";

export default function Tutorial3(){
    return <div className="loggingIn">
            <Header options={"none"}/>
            <h12 className="skip">Skip Tutorial</h12>
        <div className="img"><img src="logging.png"></img></div>
        <h1>Pick Up the Item</h1>
            <div className="text">
            <h10> Make the exchange at the meeting place you set up.</h10>
            <Link to="/tutorial2">
                <div className="button2"> <Button text={"Back"}/></div>
            </Link>
            <div className="number"><h11>3/4</h11></div>
            <Link to="/tutorial4">
                <div className="button"> <Button  bg={"linear-gradient(119.69deg, rgba(255,138,0,0.5) -15.26%, #FF8A00 98.97%)"} text={"Next"}/></div>
            </Link>
            </div>

        </div>
        
 
}