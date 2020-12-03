import React, { useState } from 'react';
import './index.scss';
import './app.scss';
import './signUp.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import Button from '../comps/Button';
import InputBox from '../comps/InputBox';

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

const ErrorName = styled.p`
margin:0px;
color:lightcoral;
font-size: 13px;
display:${props => props.display ? props.display : "none"};
margin-bottom:10px;
`;
export default function SignUp() {
    
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPass, setErrorPass ] = useState("");
    const [errorName, setErrorName ] = useState("");
    const history = useHistory();

    const HandleSignUp = async (email, pass, name) => {
        try {
        console.log('Creating an Account for: ', name, email, pass,);
        //do a await axios get to rectrieve data
        var resp = await axios.post('https://www.lendr-bc.me/auth/sign-up/', {
            email: email,
            password: pass,
            displayName: name,

            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });
        console.log(resp.data);
        history.push("/load2");
    }

    catch {
        if(name == "" ){
            console.log("Please enter your name.");
            setErrorName("flex");
        } else {
            setErrorName("none");
        }



        if(email =="" ){
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

    }
}





    return <div className="loginPage">
        <Header options={"none"} />
        <h1>Sign Up</h1>

        <div className="login">
            <Input title={"Name"} placeholder={"Jon Doe"}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            ></Input>
            <ErrorName display={errorName}>Please enter your name</ErrorName>
            <Input title={"Email"} placeholder={"example@mail.com"}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            ></Input>
            <ErrorEmail display={errorEmail}>Please enter your email</ErrorEmail>
            <Input title={"Password"} placeholder={"Password"}  type={"password"}
                onChange={(e) => {
                    setPass(e.target.value);
                }}
            ></Input>
            <InputBox placeholder={"Re-enter Password"}  type={"password"}></InputBox>
            <ErrorPass display={errorPass}>Please enter your password</ErrorPass>
                <div className="button">
                    <Button text={"Create account"}
                        onClick={() => {
                            HandleSignUp(email, pass, name);
                        }}
                    />
                </div>
        </div>
        <BgWave/>
    </div>
}
