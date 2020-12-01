import React, { useState, useEffect, useContext } from 'react';
import './app.scss';
import './settings.scss';


import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import ProfileCard from '../comps/ProfileCard';
import ReviewCard from '../comps/ReviewCard';
import SearchBar from '../comps/SearchBar';
import Menu from '../comps/Menu';

import BottomNav from '../comps/BottomNav';
import axios from 'axios';
import { Link } from "react-router-dom";
import {AppContext} from '../context/provider';


export default function Home() {
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

    useEffect(() => {
        HandleUser();
    }, [])

        return <div className="app">
        <Header />
        <h1>Settings</h1>
        <SearchBar />
        <div className="ProfileCard">
            <ProfileCard userState={true} userName={state.displayname}/>
        </div>
        <div className="Menu">
            <Menu />
        </div>

        <div className="nav">
            <BottomNav active={5} />
        </div>
    </div>
}

