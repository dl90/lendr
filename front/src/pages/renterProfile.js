import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './renterProfile.scss';
import ProfileCard from '../comps/ProfileCard'
import ReviewCard from '../comps/ReviewCard';


export default function Home() {
    return <div className="app">
        <Header />

        <ProfileCard msgState={true} />
        <h2>Users Rents</h2>
        <div className="column01">

        </div>


        <div className="nav">
            <BottomNav />
        </div>
    </div>
}
