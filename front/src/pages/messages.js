import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import Message from '../comps/Message';
import SearchBar from '../comps/SearchBar';
import './messages.scss';
import './app.scss'

import { Link } from "react-router-dom";

export default function Home() {
    return <div className="app">
        <Header />
        <h1>Messages</h1>
        <div className='search'>
            <SearchBar />
        </div>
        <Message />
        <Message />
        <Message />

        <div className="nav">
            <BottomNav active={4} />
        </div>
    </div>
}
