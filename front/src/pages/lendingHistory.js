import React, {useState, useEffect} from 'react';
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



export default function LendingHistory() {
    const [Items, setItems] = useState([]);

    const HandleGetItems = async () => {
        var itemresp = await axios.post("https://www.lendr-bc.me/post/get-all-own", {idx: 0, count: 5}, {
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
        <Header />
        <h1>History</h1>
        {/* <Link to="/post">Post</Link> */}
        <div className="search">
            <MyLendsButtons  active={3}/>
        </div>
        <div className="items">
            {
                Items.map((o,i)=>{
                    console.log("inside the array...", o,i);
                    return <ItemCard
                    img={o.images}
                    itemname={o.title}
                    price={o.rate}
                    />
                })
            }
        </div>
        <div className="nav">
            <BottomNav active={2} />
        </div>
    </div>
}
