import React from 'react';
import './index.scss';
import './app.scss';
import './tutorial1.scss';

import Header from '../comps/Header';
import Button from '../comps/SmallButton';

import {Link} from "react-router-dom";

export default function Tutorial1(){
    return <div className="loggingIn">
            <Header options={"none"}/>
            <h12 className="skip">Skip Tutorial</h12>
        <div className="img"><img src="logging.png"></img></div>
        <h1>Find an Item To Rent</h1>
            <div className="text">
            <h10>Browse the categories for items you would like to rent</h10>
            <div className="number"><h11>1/4</h11></div>
            <Link to="/tutorial2">
                <div className="button"> 
                    <Button  bg={"linear-gradient(119.69deg, rgba(255,138,0,0.5) -15.26%, #FF8A00 98.97%)"} text={"Next"}/>
                </div>
            </Link>
            </div>

        </div>
        
 
}