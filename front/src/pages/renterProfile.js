import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './renterProfile.scss';
import ProfileCard from '../comps/ProfileCard'
import ReviewCard from '../comps/ReviewCard';
import './app.scss'


export default function Home() {
    return <div className="app">
        <Header />

        <ProfileCard msgState={true} />
        <h2>Chads Items</h2>
        <div className="column01">
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
            <ReviewCard />
        </div>
        <h2>Successful Lends</h2>
        <div className="column01">
            <ReviewCard />

        </div>
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}
