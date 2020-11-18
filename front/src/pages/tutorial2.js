import React from 'react';
import './index.scss';
import './app.scss';
import './tutorial2.scss';

import Header from '../comps/Header';
import Button from '../comps/Button';

import {Link} from "react-router-dom";

export default function Tutorial2(){
    return <div className="loggingIn">
            <Header options={"none"}/>
            <h12 className="skip">Skip Tutorial</h12>
        <div className="img"><img src="logging.png" alt="Tutorial 2"></img></div>
        <h1>Send a Request</h1>
            <div className="text">
            <h10>Let the lender know you are interested in renting their item.</h10>
                <Link to="/tutorial1">
                    <div className="button2"> <Button text={"Back"}/></div>
                </Link>
                <div className="number"><h11>2/4</h11></div>
                <Link to="/tutorial3">
                    <div className="button"> <Button bg={"linear-gradient(119.69deg, rgba(255,138,0,0.5) -15.26%, #FF8A00 98.97%)"}text={"Next"}/></div>
                </Link>
            </div>

        </div>
        
 
}