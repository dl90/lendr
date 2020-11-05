import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './index.scss';
import './app.scss'
import SearchBar from '../comps/SearchBar';


export default function specificCategories({title}) {
    return <div className="app">
        <Header options = "none" />
<h1>{title}</h1>
        <div className="search">
            <SearchBar placeholder="Search Categories" />
        </div>
    
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}


specificCategories.defaultProps = {
    title: "Electronics"
}

