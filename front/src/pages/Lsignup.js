import React from 'react';
import './index.scss';
import './Lsignup.scss';

import Button from '../comps/Button';

import BgWave from '../comps/BgWave';

import {Link} from "react-router-dom";

export default function Lsignup(){
    return <div className="loginPage">
        <div><img src="signup.png" alt="Signup"></img></div>
        <h2>Creating more budget friendly options for you!</h2>
            <Link to="/login">
                <div className="button">
                    <Button text={"Login"}/>
                </div>
            </Link>
            <Link to="/signup">
                <div className="signup">
                <Button bg={"linear-gradient(119.69deg, rgba(255,138,0,0.5) -15.26%, #FF8A00 98.97%)"} text={"Signup"}/>
                </div>
            </Link>
            <BgWave/>

        </div>
        
 
}