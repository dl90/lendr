import React from 'react';
import './index.scss';
import './app.scss';
import './load1.scss';

export default function load(){
    return <div className="loggingIn">
        <h1>Logging In</h1>
        <div className="img"><img src="logging.png"></img></div>
            <div className="text">
            <h10>This might take a second.</h10>
            </div>

        </div>
        
 
}
