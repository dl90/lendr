import React from 'react';
import './index.scss';
import './app.scss';
import './signUp.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import Button from '../comps/Button';
import InputBox from '../comps/InputBox';

export default function Login(){
    return <div className="loginPage">
        <Header options={"none"}/>
        <h1>Sign Up</h1>

        <div className="login">
            <Input title={"Name"} placeholder={"Jon Doe"}></Input>
            <Input title={"Email"} placeholder={"example@mail.com"}></Input>
            <Input title={"Password"} placeholder={"Password"}></Input>
            <InputBox placeholder={"Re-enter Password"}></InputBox>
            <div className="button">
                <Button text={"Create account"}/>
            </div>

        </div>
        
    </div>
}