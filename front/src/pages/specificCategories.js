import React, { useState, useEffect } from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import './app.scss'
import '../pages/specificCategories.scss'
import SearchBar from '../comps/SearchBar';
import ProductThumbnail from '../comps/ProductThumbnail'

import { Link } from "react-router-dom";
import axios from 'axios'


export default function SpecificCategories ({ title }) {
    const [ItemPrice, setItemPrice] = useState("10");
    const [ItemDate, setItemDate] = useState("default item date");
    const [ItemTitle, setItemTitle] = useState("default title");
    const [ItemImage, setItemImage] = useState("./placeholderProfile.png");
    const [ItemPoster, setItemPoster] = useState("./placeholderProfile.png");
    const [ItemPosterName, setItemPosterName] = useState("name")
    const [Items, setItems] = useState([]);


    const HandleGetItems = async (name, rate) => {
        var itemresp = await axios.post("https://www.lendr-bc.me/post/get-all", { idx: 0, count: 5 }, {
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });
        console.log("repo data");
        console.log(itemresp.data);

        setItems([...itemresp.data]);
    }

    useEffect(() => {
        HandleGetItems();
    }, [])


    return <div className="app">
        <Header options="none" />
        <h1>{title}</h1>
        <div className="search">
            <SearchBar placeholder="Search Categories" />
        </div>

        <div className="thumb_cont">
            <div className="thumb">
                {
                    Items.map((o, i) => {
                        console.log("explorepage items array", o, i);
                        return <ProductThumbnail
                            itemname={o.title}
                            price={o.rate}
                            date={o.created_on}
                            img={o.images}
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
    title: "Electronics"
}


