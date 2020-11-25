import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import './index.scss';
import './app.scss';
import './load1.scss';

export default function Load1({loadtxt}){
    const history = useHistory();

    useEffect(()=>{
        setTimeout(function(){history.push("/explorePage");}, 3000);
    });
    return <div className="loginPage">
        <h1>{loadtxt}</h1>
        <div className="img"><img src="/Loading.png"></img></div>
            <div className="text">
            <h2>This might take a second.</h2>
            </div>
        </div>
}

Load1.defaultProps = {
    loadtxt: "Logging In",
}