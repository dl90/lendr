import React from 'react';
import BottomNav from '../comps/BottomNav';
import Button from '../comps/Button';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './index.scss';


export default function Home() {
    return <div className="app">
        <Header />
        <h1>Categories</h1>
        <CategoryGallery />
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}
