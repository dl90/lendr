import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './app.scss'
import '../pages/specificCategories.scss'
import SearchBar from '../comps/SearchBar';
import ProductThumbnail from '../comps/ProductThumbnail'

import {Link} from "react-router-dom";

export default function specificCategories({title}) {
    return <div className="app">
        <Header options = "none" />
<h1>{title}</h1>
        <div className="search">
            <SearchBar placeholder="Search Categories" />
        </div>

    <div className="thumb_cont">
        <div className = "thumb">
        <ProductThumbnail></ProductThumbnail>
        </div>
        <div className = "thumb">
        <ProductThumbnail ></ProductThumbnail>
        </div>
        <div className = "thumb">
        <ProductThumbnail></ProductThumbnail>
        </div>
        </div>
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}


specificCategories.defaultProps = {
    title: "Electronics"
}

