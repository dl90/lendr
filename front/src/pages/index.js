import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './index.scss';
import './app.scss'
import SearchBar from '../comps/SearchBar';


export default function Home() {
    return <div className="app">
        <Header />
        <h1>Categories</h1>
        <div className="search">
            <SearchBar placeholder="Search Categories" />
        </div>
        <CategoryGallery />
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}
