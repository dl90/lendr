import React, {useState} from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './app.scss'
import '../pages/specificCategories.scss'
import SearchBar from '../comps/SearchBar';
import ProductThumbnail from '../comps/ProductThumbnail'

import {Link} from "react-router-dom";


export default function SpecificCategories({title}) {
const [ItemPrice, setItemPrice]=useState("10");
const [ItemDate, setItemDate]=useState("default item date");
const [ItemTitle, setItemTitle]=useState("default title");
const [ItemImage, setItemImage]=useState("./placeholderProfile.png");
const [ItemPoster, setItemPoster]=useState("./placeholderProfile.png");
const [ItemPosterName, setItemPosterName] = useState("name")

    return <div className="app">
        <Header options = "none" />
<h1>{title}</h1>
        <div className="search">
            <SearchBar placeholder="Search Categories" />
        </div>

    <div className="thumb_cont">
        <div className = "thumb">
        <ProductThumbnail itemname={ItemTitle} img={ItemImage} price={ItemPrice} pfp={ItemPoster} username={ItemPosterName}></ProductThumbnail>
        </div>
        <div className = "thumb">
        <ProductThumbnail itemname={ItemTitle} img={ItemImage} price={ItemPrice} pfp={ItemPoster} username={ItemPosterName} ></ProductThumbnail>
        </div>
        <div className = "thumb">
        <ProductThumbnail itemname={ItemTitle} img={ItemImage} price={ItemPrice} pfp={ItemPoster} username={ItemPosterName}></ProductThumbnail>
        </div>
        </div>
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}

SpecificCategories.defaultProps = {
title:"Electronics"
}


