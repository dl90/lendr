import React from 'react';
import './index.scss';
import './app.scss';
import './tutorial2.scss';
// import Lottie from 'react-lottie';
import animData from'../pages/lottie.json';

import Header from '../comps/Header';
import Button from '../comps/Button';

import {Link} from "react-router-dom";


const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

export default function Tutorial2(){
    return <div className="loggingIn">
            <Header options={"none"}/>
            <Link to="/load1"><h12 className="skip">Skip Tutorial</h12></Link>
            {/* <div className="lottiediv"> <Lottie options={defaultOptions}  /> </div> */}
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