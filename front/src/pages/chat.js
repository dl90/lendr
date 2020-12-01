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

export default function Chat(props) {

    var itemMemory = props.location.state.o;
    console.log(itemMemory);

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
        {/* <UserAvatar imgsrc={UserPicture}></UserAvatar> */}
        <Header/>
        <h2>{itemMemory.display_name}</h2>
        <div className="threadBox">
            <div className="thread">
            {Msgs.map((o,i)=>{
                return <div key={i}>{o.username} - {o.msg}</div>
            })}
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
            <MessageBar change={
                (e)=>{
                    setInp(e.target.value);
                }
            } click={
                ()=>{
                    console.log("clicked")
                    socket.emit("getmsg", {username:"Henry", msg:inp})
                }
            }></MessageBar>
            {/* <input onChange={(e)=>{
                setInp(e.target.value);
            }} />
            <button onClick={()=>{
                console.log("clicked")
                socket.emit("getmsg", {username:"Henry", msg:inp})
            }}>Send</button>; */}
        </div>
    </div>
    
}
