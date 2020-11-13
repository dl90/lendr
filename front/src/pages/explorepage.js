import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './app.scss'
import '../pages/explorepage.scss'
import SearchBar from '../comps/SearchBar';
import ReviewCard from '../comps/ReviewCard';
import styled from 'styled-components';
import CategoryButton from '../comps/CategoryButton';

import {Link} from "react-router-dom";

const UserAvatar = styled.div`
height:60px;
max-width: 60px;
border-radius:50%;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
 img {
     width:100%;
     height:100%;
 }
`;

export default function ExplorePage({userfname}) {
    return <div>
        <div className="Header">
            <div className="Header_top">
                <div>Hi {userfname},</div>
                <UserAvatar><img src="/placeholderProfile.png"></img></UserAvatar>
            </div>
            <h1>Explore</h1>
            <div className="search">
                <SearchBar placeholder="Search Items" />
            </div>
            <div className="Category_cont">
                <div className="Category_header">
                    <h2>Categories</h2>
                    <h6>See All</h6>
                </div>
            <div className="Category_divs">
                <Link to="/specificCategories">
                    <CategoryButton src={"/vehicles.svg"} text={"Vehicles"}></CategoryButton>
                </Link>
                <Link to="/specificCategories">
                <CategoryButton src={"/appliances.svg"} text={"Appliances"}></CategoryButton>
                </Link>
                <Link to="/specificCategories">
                <CategoryButton src={"/electronics.svg"} text={"Electronics"}></CategoryButton>
                </Link>
                <Link to="/specificCategories">
                <CategoryButton src={"/furniture.svg"} text={"Furniture"}></CategoryButton>
                </Link>
            </div>
        </div>
        
        
        
        </div>
        <div className="Recommended_cont">
            <div className="Section_header">
                <h2 >Recommended</h2>
                <Link to="/categories">
                    <h6>See All</h6>
                </Link>
            </div>
        
        <div className="Recommended_divs">
            <ReviewCard></ReviewCard>
            <ReviewCard></ReviewCard>
        </div>
        </div>
        <div className="Saved_cont">
        <div className="Section_header">
            <h2>Saved Items</h2>
            <h6>See All</h6>
        </div>
        <div className="Recommended_divs">
            <ReviewCard></ReviewCard>
            <ReviewCard></ReviewCard>
        </div>
        {/* </div> */}
        </div>
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}


ExplorePage.defaultProps = {
    userfname: "Steven"
}

