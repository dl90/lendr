import React from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './lending.scss';
import './app.scss';
import SearchBar from '../comps/SearchBar';
import MyLendsButtons from '../comps/MyLendsButtons';
import ItemCard from '../comps/ItemCard';
import axios from 'axios';
import { Link } from "react-router-dom";



export default function LendingAvailable() {

    const HandleGetItems = async (name, rate) => {
        var resp = await axios.get('https://www.lendr-bc.me/item/get', {

            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });



    }






    return <div onLoad={HandleGetItems} className="app">
        <Header />
        <h1>Available</h1>
        {/* <Link to="/post">Post</Link> */}
        <div className="search">
            <MyLendsButtons />
        </div>
        <ItemCard />
        <ItemCard />
        <div className="nav">
            <BottomNav active={2} />
        </div>
    </div>
}
