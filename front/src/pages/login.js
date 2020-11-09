import React, { useState } from 'react';
import './index.scss';
import './app.scss';
import './login.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import Button from '../comps/Button';

import axios from 'axios';
export default function Login() {

    // const [login, setLogin] = useState("Test");

    const [userEmail, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const HandleLogin = async (userEmail, pass) => {
        console.log("logging in", userEmail, pass);
        //do a await axios get to rectrieve data
        var resp = await axios.post('http://ec2-44-242-43-38.us-west-2.compute.amazonaws.com/auth/login/', {
            email: userEmail,
            password: pass,
            // email: "test@test.com",
            // password: "test"
        });
        console.log(resp.data);

    }


    return <div className="loginPage">
        <Header options={"none"} />
        <h1>Hey there, welcome back!</h1>

        <div className="login">
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
            <a>Forgot your password?</a>

            <div className="button">
                <Button text={"Login"}
                    onClick={() => {
                        HandleLogin(userEmail, pass);
                    }}
                />
            </div>

        </div>

    </div>
}