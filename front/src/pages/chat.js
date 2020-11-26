import React, {useEffect, useState} from 'react';
import Header from '../comps/Header';
import './app.scss';
import './chat.scss';

import ChatPrimary from '../comps/ChatPrimary';
import ChatSecondary from '../comps/ChatSecondary';
import MessageBar from '../comps/MessageBar';
import UserAvatar from '../comps/UserAvatar';

import axios from 'axios';
// make sure no one can just connect, do if statement on useEffect
import {Link} from "react-router-dom";

import io from 'socket.io-client';
var socket = null;

export default function Chat() {
    const [Msgs, setMsgs]= useState([]);
    const [inp, setInp] = useState("");
    const HandleGetItems = async (name, rate) => {
        var msgresp = await axios.post("https://localhost:8443/msg/get", {idx: 0, count: 5}, {
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true});
        console.log("repo data");
        console.log(msgresp.data); 
        setMsgs([...msgresp.data]);
    }

    useEffect(()=>{
        socket = io("http://localhost:8888");

        socket.on("newmsg", (data)=>{
            console.log(data);
            setMsgs([...data]);
        });
    },[])

    return <div onLoad={HandleGetItems} >
        <div className="chat">
        {/* <div className="profile">
            <UserAvatar></UserAvatar>
        </div> */}
        <Header/>
        <div className="threadBox">
            <div className="thread">
            {Msgs.map((o,i)=>{
                return <div key={i}>{o.username} - {o.msg}</div>
            })}
                
            {/* <ChatSecondary></ChatSecondary>
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
            <ChatSecondary></ChatSecondary> */}
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
            {/* <MessageBar></MessageBar> */}
            <input onChange={(e)=>{
                setInp(e.target.value);
            }} />
            <button onClick={()=>{
                console.log("clicked")
                socket.emit("getmsg", {username:"Henry", msg:inp})
            }}>Send</button>;
        </div>
    </div>
    
}
