import React from 'react';
import Header from '../comps/Header';
import './app.scss';
import './chat.scss';

import ChatPrimary from '../comps/ChatPrimary';
import ChatSecondary from '../comps/ChatSecondary';
import MessageBar from '../comps/MessageBar';
import UserAvatar from '../comps/UserAvatar';

import {Link} from "react-router-dom";

export default function Chat() {
    return <div>
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
            <ChatPrimary></ChatPrimary>
            </div>
        </div>
    </div>
    <div className="msg">
            <MessageBar></MessageBar>
        </div>
    </div>
    
}
