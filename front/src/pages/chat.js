import React, {useState} from 'react';
import Header from '../comps/Header';
import './app.scss';
import './chat.scss';

import ChatPrimary from '../comps/ChatPrimary';
import ChatSecondary from '../comps/ChatSecondary';
import MessageBar from '../comps/MessageBar';
import UserAvatar from '../comps/UserAvatar';

import axios from 'axios';

import {Link} from "react-router-dom";

export default function Chat() {

    const [Msgs, setMsgs]= useState([]);

    const HandleGetItems = async (name, rate) => {
        var msgresp = await axios.post("https://localhost:8443/msg/get", {idx: 0, count: 5}, {
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });
        console.log("repo data");
        console.log(msgresp.data);

        setMsgs([...msgresp.data]);
    }

    return <div onLoad={HandleGetItems} >
        <div className="chat">
        {/* <div className="profile">
            <UserAvatar></UserAvatar>
        </div> */}
        <Header/>
        <div className="threadBox">
            <div className="thread">
                
            <ChatSecondary></ChatSecondary>
            <ChatPrimary></ChatPrimary>
            <ChatPrimary></ChatPrimary>
            <ChatSecondary></ChatSecondary>
            <ChatSecondary></ChatSecondary>
            <ChatPrimary></ChatPrimary>
            <ChatSecondary></ChatSecondary>
            <ChatPrimary></ChatPrimary>
            <ChatSecondary></ChatSecondary>
            <ChatPrimary></ChatPrimary>
            <ChatPrimary></ChatPrimary>
            <ChatSecondary></ChatSecondary>
            <ChatSecondary></ChatSecondary>
            <ChatPrimary></ChatPrimary>
            <ChatSecondary></ChatSecondary>
            {
                Msgs.map((o,i)=>{
                    console.log("inside the array...", o,i);
                    return <ChatPrimary
                    // itemname={o.title}
                    // price={o.post_description}
                    />
                })
            }
            </div>
        </div>
    </div>
    <div className="msg">
            <MessageBar></MessageBar>
        </div>
    </div>
    
}
