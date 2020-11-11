import React from 'react';
import './app.scss';
import './settings.scss';


import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import ProfileCard from '../comps/ProfileCard';
import ReviewCard from '../comps/ReviewCard';
import SearchBar from '../comps/SearchBar';
import Menu from '../comps/Menu';

import BottomNav from '../comps/BottomNav';

export default function Home() {
    return <div className="app">
        <Header />
        <h1>Settings</h1>
        <SearchBar />
        <div className="ProfileCard">
            <ProfileCard userState={true} />
        </div>
        <div className="Menu">
            <Menu />
        </div>

        <div className="nav">
            <BottomNav />
        </div>
    </div>
}

