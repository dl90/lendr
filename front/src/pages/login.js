import React, { useState } from 'react';
import './index.scss';
import './app.scss';
import './login.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import Button from '../comps/Button';

import BgWave from '../comps/BgWave';
import {Link, useHistory} from "react-router-dom";

import axios from 'axios';
import styled from 'styled-components';

const ErrorEmail = styled.p`
margin:0px;
color:lightcoral;
font-size: 13px;
display:${props => props.display ? props.display : "none"};
`;

const ErrorPass = styled.p`
margin:0px;
color:lightcoral;
font-size: 13px;
display:${props => props.display ? props.display : "none"};
margin-bottom:10px;
`;

export default function Login ({display}) {
    const [userEmail, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const history = useHistory();
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass ] = useState("");
    const HandleLogin = async (userEmail, pass) => {
        try{
        console.log("logging in", userEmail, pass);
        //do a await axios get to rectrieve data

        const status = await axios.post('https://www.lendr-bc.me/auth/login/', {
            email: userEmail,
            password: pass,
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });
        console.log(status);
        history.push("/explorePage");
        
    }
        catch {
            if(userEmail =="" ){
                console.log("Please enter an email address.");
                setErrorEmail("flex");
            } else {
                setErrorEmail("none");
            }

            if(pass == ""){
                console.log("Please enter a password.");
                setErrorPass("flex");
            } else {
                setErrorPass("none");
            }
            console.log("Your email and password does not match.");
        }
    }


    return <div className="loginDiv">
        <Header options={"none"} />
        <h1>Hey there, welcome back!</h1>

        <div className="login">
            <Input title={"Email"} placeholder={"example@mail.com"}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            ></Input>
            <ErrorEmail display={errorEmail}>Please enter an email</ErrorEmail>
            <Input title={"Password"} placeholder={"Password"} type={"password"}
                onChange={(e) => {
                    setPass(e.target.value);
                }}
            ></Input>
            <ErrorPass display={errorPass}>Please enter a password</ErrorPass>
            <a>Forgot your password?</a>
                <div className="button">
                    <Button text={"Login"}
                        onClick={() => {
                            HandleLogin(userEmail, pass);
                        }}
                    />
                </div>
        </div>
        <BgWave></BgWave>
    </div>
}