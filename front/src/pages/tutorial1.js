import React from 'react';
import './index.scss';
import './app.scss';
import './tutorial1.scss';
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
export default function Tutorial1(){
    return <div className="loggingIn">
            <Header options={"none"}/>
            <h12 className="skip">Skip Tutorial</h12>
           <div className="lottiediv"> <Lottie
            options={defaultOptions}  /> </div>
        <h1>Find an Item To Rent</h1>
            <div className="text">
            <h10>Browse the categories for items you would like to rent</h10>
            <div className="number"><h11>1/4</h11></div>
            <Link to="/tutorial2">
                <div className="button"> 
                    <Button bg={"linear-gradient(119.69deg, rgba(255,138,0,0.5) -15.26%, #FF8A00 98.97%)"} text={"Next"}/>
                </div>
            </Link>
            </div>

        </div>
        
 
}