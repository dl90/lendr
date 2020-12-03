import React, { useState, useContext, useEffect } from 'react';
import './index.scss';
import './app.scss';
import './item.scss';

import Header from '../comps/Header';
import ProfileCard from '../comps/ProfileCard';
import AskLender from '../comps/AskLender';
import BottomNav from '../comps/BottomNav';
import Like from '../comps/Like';

// import {Link} from "react-router-dom";

import axios from 'axios';
import { AppContext } from '../context/provider';
export default function Item(props, { Price, img, Desc }) {

    var itemMemory = props.location.state.o;
    console.log(itemMemory);

    const { state, dispatch } = useContext(AppContext)
    const [userName, setUsername] = useState("");

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    // const [location, setLocation] = useState("");
    const [rate, setRate] = useState("");

    // const [heartActive, changeHeartActive] = useState(false);

    const HandleUser = async (user_id) => {
        var resp = await axios.post("https://lendr-bc.me/user/get-all", { active: true, reportFlag: false }, {
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });
        console.log("TESTING THIS POST" + resp.data);
    }

    // const HandleNewPost = async (title, desc, location, rate, itemID) => {
    //     console.log('Creating a New Post: ', "Title:", title, "Desc:", desc, "Location:", location, "Rate:", rate, "ItemID:", itemID);
    //     var resp = await axios.get('https://lendr-bc.me/item/get');
    //     console.log(resp);
    //     setTitle(resp.data.postTitle);
    //     setDesc(resp.data.postDescription);
    //     // setLocation(resp.data.postLocation);
    //     setRate(resp.data.postRate);
    //     // setID(resp.data.itmeID);
    // }


    useEffect(() => {
        HandleUser();
    }, [])


    return <div>
        <div className="item">
            {state.username}
            <Header />
            <div className="title">
                <h1>{itemMemory.title}</h1>
                <Like></Like>
            </div>
            <h2>Price</h2>
            <p>{itemMemory.rate}</p>
        </div>

        <div className="imageDiv">
            <h2>Images</h2>
            <div className="images">
                <img src={itemMemory.images[0]}></img>
                <img src={itemMemory.images[1]}></img>
                <img src={itemMemory.images[2]}></img>
            </div>
        </div>
        <div className="item">
            <div>
                <h2>Description</h2>
                <p>{itemMemory.post_description}</p>
            </div>
            <div>
                <h2>Lended By:</h2>
                <ProfileCard userName={itemMemory.user_id} />
                <AskLender />
            </div>
            <div className="location">
                <h2>Location</h2>
                <img src={img}></img>
            </div>
        </div>
        <div className="nav">
            <BottomNav />
        </div>

    </div>
}

Item.defaultProps = {
    title: "Item Title",
    Price: "$0/Day",
    img: "/Bike.png",
    Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}