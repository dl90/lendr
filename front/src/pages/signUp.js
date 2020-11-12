import React, { useState } from 'react';
import './index.scss';
import './app.scss';
import './signUp.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import Button from '../comps/Button';
import InputBox from '../comps/InputBox';

import {Link} from "react-router-dom";

import axios from 'axios';
export default function SignUp() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");

    const HandleSignUp = async (email, pass, name) => {
        console.log('Creating an Account for: ', name, email, pass,);
        //do a await axios get to rectrieve data
        var resp = await axios.post('http://ec2-44-242-43-38.us-west-2.compute.amazonaws.com/auth/sign-up', {
            email: email,
            password: pass,
            displayName: name
        });
        console.log(resp.data);
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
            <Input title={"Email"} placeholder={"example@mail.com"}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            ></Input>
            <Input title={"Password"} placeholder={"Password"}
                onChange={(e) => {
                    setPass(e.target.value);
                }}
            ></Input>
            <InputBox placeholder={"Re-enter Password"} ></InputBox>
            <Link to="/tutorial1">
                <div className="button">
                    <Button text={"Create account"}
                        onClick={() => {
                            HandleSignUp(email, pass, name);
                        }}
                    />
                </div>
            </Link>
           

        </div>

    </div>
}
