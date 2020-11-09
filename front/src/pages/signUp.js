import React, { useState } from 'react';
import './index.scss';
import './app.scss';
import './signUp.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import Button from '../comps/Button';
import InputBox from '../comps/InputBox';

import axios from 'axios';
export default function SignUp() {

    // const [email, setEmail] = useState(null);
    // const [password, setPassword] = useState(null);

    const HandlePostAccount = async () => {
        console.log('Logging In');
        //do a await axios get to rectrieve data
        var resp = await axios.post('http://ec2-44-242-43-38.us-west-2.compute.amazonaws.com/auth/sign-up', {
            email: email,
            password: pass
        });
        console.log("response", resp.auth.SignUp);
        //console log the response data
        // setEmail(email);
        // setPassword(password);
        // console.log(CreateAccount);
    }


    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    return <div className="loginPage">
        <Header options={"none"} />
        <h1>Sign Up</h1>

        <div className="login">
            <Input title={"Name"} placeholder={"Jon Doe"}></Input>
            <Input title={"Email"} placeholder={"example@mail.com"}
                onChange={(e) => {
                    setEmail(e.target.value)
                }}
            ></Input>
            <Input title={"Password"} placeholder={"Password"}></Input>
            <InputBox placeholder={"Re-enter Password"}
                onChange={(e) => {
                    setPass(e.target.value)
                }}
            ></InputBox>
            <div className="button">
                <Button text={"Create account"} onClick={HandlePostAccount} />
            </div>

        </div>

    </div>
}

