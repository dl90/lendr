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

export default function ExplorePage({ userfname }) {
    return <div className="app">
        <div className="Header">
            <div className="Header_top">
                <div>Hi {userfname},</div>
                <UserAvatar><img src="/placeholderProfile.png"></img></UserAvatar>
            </div>
            <h1>Explore</h1>
        </div>
        <div className="search">
            <SearchBar placeholder="Search Items" />
        </div>
        <div className="content_div">
            <div className="Category_cont">
                <h2>Categories</h2>
                <div className="Category_divs">
                    <CategoryButton src={"/vehicles.svg"} text={"Vehicles"}></CategoryButton>
                    <CategoryButton src={"/appliances.svg"} text={"Appliances"}></CategoryButton>
                    <CategoryButton src={"/electronics.svg"} text={"Electronics"}></CategoryButton>
                    <CategoryButton src={"/furniture.svg"} text={"Furniture"}></CategoryButton>
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
            <BottomNav />
        </div>
    </div>
}


ExplorePage.defaultProps = {
    userfname: "Steven"
}
