import React from 'react';
import './index.scss';
import './app.scss';
import './tutorial4.scss';
import Lottie from 'react-lottie';
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

export default function Tutorial4(){
    return <div className="loggingIn">
            <Header options={"none"}/>
            <div className="lottiediv"> <Lottie
            options={defaultOptions}  /> </div>
        <h1>Write a Review</h1>
            <div className="text">
            <h10> Rate your experience and let others' know what they can expect.</h10>

            <Link to="/load1">
                <div className="startbutton"> <Button text={"Get Started"}/></div>
            </Link>
            </div>

        </div>
        
 
}