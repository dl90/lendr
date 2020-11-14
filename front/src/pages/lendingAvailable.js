import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './lending.scss';
import './app.scss';
import SearchBar from '../comps/SearchBar';
import MyLendsButtons from '../comps/MyLendsButtons';
import ItemCard from '../comps/ItemCard';


import { Link } from "react-router-dom";



export default function LendingAvailable() {
    return <div className="app">
        <Header />
        <h1>Available</h1>
        {/* <Link to="/post">Post</Link> */}
        <div className="search">
            <MyLendsButtons />
        </div>
        <ItemCard />
        <ItemCard />
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}
