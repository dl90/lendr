import React from 'react';
import './index.scss';
import './app.scss';
import './login.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import Button from '../comps/Button';

export default function Login(){
    return <div className="loginPage">
        <Header options={"none"}/>
        <h1>Hey there, welcome back!</h1>

        <div className="login">
            <Input title={"Email"} placeholder={"example@mail.com"}></Input>
            <Input title={"Password"} placeholder={"Password"}></Input>
            <a>Forgot your password?</a>
            
            <div className="button">
                <Button text={"Login"}/>
            </div>

        </div>
        
    </div>
}