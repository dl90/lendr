import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './lending.scss';
import './app.scss';
import SearchBar from '../comps/SearchBar';
import MyLendsButtons from '../comps/MyLendsButtons';


import { Link } from "react-router-dom";



export default function Lending() {
    return <div className="app">
        <Header />
        <h1>My Lends</h1>
        {/* <Link to="/post">Post</Link> */}
        <div className="search">
            <MyLendsButtons />
        </div>
        <CategoryGallery />
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}
