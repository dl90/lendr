import React, { useState } from 'react';
import './index.scss';
import './app.scss';
import './login.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import Button from '../comps/Button';

// import network from '../network/cookie.js'
import axios from 'axios'

export default function Login () {

    // const [login, setLogin] = useState("Test");

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

        const newPost = await axios.post('https://www.lendr-bc.me/post/new-item', {
            itemName: 'test',
            itemCondition: 'new',
            itemAge: 1,
            postTitle: 'test',
            postRate: 1.11,
            postDescription: 'test',
            postLocation: 'test',
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true })
        console.log(newPost.data)

        const posts = await axios.post('https://www.lendr-bc.me/post/get-all', {
            idx: 0,
            count: 5,
            headers: {
                crossDomain: true,
                'Content-Type': 'application/json'
            }
        }, { withCredentials: true })

        console.log(posts.data)

        //const res = await network.axiosPost('/auth/login', { email: userEmail, password: pass })
        //console.log(res)
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
            <Input title={"Password"} placeholder={"Password"} type={"password"}
                onChange={(e) => {
                    setPass(e.target.value);
                }}
            ></Input>
            <a>Forgot your password?</a>

            <Link to="/">
                <div className="button">
                    <Button text={"Login"}
                        onClick={() => {
                            HandleLogin(userEmail, pass);
                        }}
                    />
                </div>
            </Link>
        </div>

    </div>
}