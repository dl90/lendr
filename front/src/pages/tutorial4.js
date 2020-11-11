import React from 'react';
import './index.scss';
import './app.scss';
import './tutorial4.scss';

import Header from '../comps/Header';
import Button from '../comps/Button';
export default function load(){
    return <div className="loggingIn">
            <Header options={"none"}/>
        <div className="img"><img src="logging.png"></img></div>
        <h1>Write a Reviewt</h1>
            <div className="text">
            <h10> Rate your and let others' know what they can expect.</h10>

          
           <div className="button2"> <Button text={"Get Started"}/></div>
            </div>

        </div>
        
 
}