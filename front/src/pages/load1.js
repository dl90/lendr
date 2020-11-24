import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import './index.scss';
import './app.scss';
import './load1.scss';

export default function Load1({loadtxt}){
    const history = useHistory();

    useEffect(()=>{
        setTimeout(function(){history.push("/explorePage");}, 5000);
    });
    return <div>
        <h1>{loadtxt}</h1>
        <div className="img"><img src="/Loading.png"></img></div>
            <div className="text">
            <h2>This might take a second.</h2>
            </div>
        </div>
}

Load1.defaultProps = {
    loadtxt: "Loggin In",
}