import React, { useState } from 'react';
import './index.scss';
import './app.scss';
import './login.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import Button from '../comps/Button';

import BgWave from '../comps/BgWave';
import {Link} from "react-router-dom";

import axios from 'axios';


export default function Login () {
    const [userEmail, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const HandleLogin = async (userEmail, pass) => {
        console.log("logging in", userEmail, pass);
        //do a await axios get to rectrieve data

        const status = await axios.post('https://www.lendr-bc.me/auth/login/', {
            email: userEmail,
            password: pass,
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });
        console.log(status)

        // const newPost = await axios.post('https://www.lendr-bc.me/post/new-item', {
        //     itemName: 'test',
        //     itemCondition: 'new',
        //     itemAge: 1,
        //     postTitle: 'test',
        //     postRate: 1.11,
        //     postDescription: 'test',
        //     postLocation: 'test',
        //     headers: { crossDomain: true, 'Content-Type': 'application/json' }
        // }, { withCredentials: true })
        // console.log(newPost.data)

        // const posts = await axios.post('https://www.lendr-bc.me/post/get-all', {
        //     idx: 0,
        //     count: 5,
        //     headers: {
        //         crossDomain: true,
        //         'Content-Type': 'application/json'
        //     }
        // }, { withCredentials: true })
        // console.log(posts.data)
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
            <Input title={"Password"} placeholder={"Password"} type={"password"}
                onChange={(e) => {
                    setPass(e.target.value);
                }}
            ></Input>
            <a>Forgot your password?</a>

            <Link to="/explorePage">
                <div className="button">
                    <Button text={"Login"}
                        onClick={() => {
                            HandleLogin(userEmail, pass);
                        }}
                    />
                </div>
            </Link>
        </div>
        <BgWave></BgWave>
    </div>
}