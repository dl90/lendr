import React, { useState, useEffect, useContext } from 'react';
import './index.scss';
import './app.scss';
import './profileSettings.scss';

import Header from '../comps/Header';
import ProfileCard from '../comps/ProfileCard';
import Input from '../comps/Input';
import InputBox from '../comps/InputBox';
import Button from '../comps/Button';

import {Link} from "react-router-dom";

import {AppContext} from '../context/provider';

import axios from 'axios';
export default function ProfileSettings() {
    useEffect(() => {
        HandleUser();
    }, [])

    // const [login, setLogin] = useState("Test");
    const {state} = useContext(AppContext);
    // const [UserPicture, setUserPicture] = useState(null);
    const [DisplayName, setDisplayName] = useState("");

    // const [username, setUserName] = useState(null)
    const HandleUser = async () => {
        var resp = await axios.get('https://www.lendr-bc.me/me', {
            withCredentials: true
        })
        setDisplayName(resp.data.display_name);
        console.log(resp.data.display_name);
        // setUserPicture(resp.data.avatar_url);
    }
    
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");

    const [oPWord, setOPWord] = useState("");
    const [nPWord, setNPWord] = useState("");
    const [vNPWord, setVNPWord] = useState("");

    const HandleProfileChanges = async (fName, lName, oPWord, nPWord, vNPWord) => {
        console.log("logging in", fName, lName, oPWord, nPWord, vNPWord);
        var resp = await axios.post('http://ec2-44-242-43-38.us-west-2.compute.amazonaws.com/auth/login/', {
            // Example:
            // email: "test@test.com",
            // password: "test"
        });
        console.log(resp.data);
    }


    return <div className="ProfileSettingsPage">
        <Header />
        <h1>Profile Settings</h1>
        <ProfileCard userState={true} userName={state.displayname}></ProfileCard>
        <div className="login">
            <Input title={"Change Name"} placeholder={"First Name"}
                onChange={(e) => {
                    setFName(e.target.value);
                }}
            ></Input>
            <InputBox placeholder={"Last Name"}
                onChange={(e) => {
                    setLName(e.target.value);
                }}
            ></InputBox>

            <Input title={"Change Password"} placeholder={"Old Password"} type={"password"}
                onChange={(e) => {
                    setOPWord(e.target.value);
                }}
            ></Input>
            <InputBox placeholder={"New Password"} type={"password"}
                onChange={(e) => {
                    setNPWord(e.target.value);
                }}
            ></InputBox>
            <InputBox placeholder={"Verify New Password"} type={"password"}
                onChange={(e) => {
                    setVNPWord(e.target.value);
                }}
            ></InputBox>
            

            <Link to="/">
                <div className="button">
                    <Button text={"Save Changes"}
                        onClick={() => {
                            HandleProfileChanges(fName, lName, oPWord, nPWord, vNPWord);
                        }}
                    />
                </div>
            </Link>
        </div>
        {/* <div className="nav">
            <BottomNav />
        </div> */}

    </div>
}