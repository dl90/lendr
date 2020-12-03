import React, {useState, useEffect} from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './app.scss'
import '../pages/specificCategories.scss'
import SearchBar from '../comps/SearchBar';
import ProductThumbnail from '../comps/ProductThumbnail'

import {Link} from "react-router-dom";
import axios from 'axios'


export default function SpecificCategories(props,{title}) {
    var itemMemory = props.location.state;
    console.log(itemMemory);

const [Items, setItems] = useState([]);
const [Users, setUsers] = useState([]);


const HandleGetItems = async () => {
    

    var itemresp = await axios.post("https://www.lendr-bc.me/post/get-all", {idx: 0, count: 50}, {
        headers: { crossDomain: true, 'Content-Type': 'application/json' }
    }, { withCredentials: true });
    console.log("Specific Category repo data");
    // console.log(itemresp.data);

    setItems([...itemresp.data]);
}

const HandleGetUsers = async () => {
    
    var userresp = await axios.get('https://localhost:8443/user/get-all',
            { headers: { crossDomain: true, 'Content-Type': 'application/json' } }, { withCredentials: true });
    console.log(userresp.data);
    setUsers([...userresp.data]);
}

useEffect(() => {
    HandleGetItems();
    HandleGetUsers();
}, [])


    return <div className="app">
        <Header options = "none" />
        <h1>{itemMemory}</h1>
        <div className="search">
            <SearchBar placeholder="Search Categories" />
        </div>

    <div className="thumb_cont">
        <div className = "thumb">
        {
                Items.map((o,i)=>{
                    console.log("explorepage items array", o,i);
                    return <ProductThumbnail
                    itemname={o.title}
                    price={o.rate}
                    date={o.created_on}
                    img={o.images}
                    username={o.user_id}
                    />
                })
            }
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


