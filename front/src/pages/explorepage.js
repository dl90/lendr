import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './app.scss'
import '../pages/explorepage.scss'
import SearchBar from '../comps/SearchBar';
import ReviewCard from '../comps/ReviewCard';
import CategoryButton from '../comps/CategoryButton';
import styled from 'styled-components';


const UserAvatar = styled.div`
height:60px;
max-width: 60px;
border-radius:50%;

overflow:hidden;
`;

export default function explorepage() {
    return <div className="app">
        <UserAvatar><img src="/placeholderProfile.png"></img></UserAvatar>
        <div className="header">
        <h1>Explore</h1>
        </div>
        <div className="search">
            <SearchBar placeholder="Search Categories" />
        </div>
        <div className="content_div">
        <div className="Category_cont">
            <div className="Category_header">
        <h2>Categories</h2>
        <h6>See All</h6>
        </div>
        <div className="Category_divs">
        <CategoryButton src="/vehicle.png" text="Automobile"></CategoryButton>
        <CategoryButton src="/vehicle.png" text="Appliances"></CategoryButton>
        <CategoryButton src="/vehicle.png" text="Electronics"></CategoryButton>
        <CategoryButton src="/vehicle.png" text="Furniture"></CategoryButton>
        </div>
        </div>
        <div className="Recommended_cont">
        <h2 className="Recommended_header">Recommended</h2>
        <div className="Recommended_divs">
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        </div>
        </div>
        <div className="Saved_cont">
        <h2 className="Saved_header">Saved Items</h2>
        <div className="Recommended_divs">
        <ReviewCard></ReviewCard>
        <ReviewCard></ReviewCard>
        </div>
        </div>
        </div>
        <div className="nav">
            <BottomNav/>
        </div>
    </div>
}


explorepage.defaultProps = {
    
}

