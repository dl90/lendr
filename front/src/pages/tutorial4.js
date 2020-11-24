import React from 'react';
import './index.scss';
import './app.scss';
import './tutorial4.scss';

import Header from '../comps/Header';
import Button from '../comps/Button';

import {Link} from "react-router-dom";

export default function Tutorial4(){
    return <div className="loggingIn">
            <Header options={"none"}/>
        <div className="img"><img src="logging.png" alt="Tutorial 4"></img></div>
        <h1>Write a Review</h1>
            <div className="text">
            <h10> Rate your experience and let others' know what they can expect.</h10>

            <Link to="/load1">
                <div className="button2"> <Button text={"Get Started"}/></div>
            </Link>
            </div>

        </div>
        
 
}