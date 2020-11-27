import React, { useState, useEffect, useContext } from 'react';
import BottomNav from '../comps/BottomNav';
import './app.scss'
import '../pages/explorepage.scss'
import SearchBar from '../comps/SearchBar';
import ReviewCard from '../comps/ReviewCard';
import UserAvatar from '../comps/UserAvatar';
import CategoryButton from '../comps/CategoryButton';
import { Link } from "react-router-dom";
import axios from 'axios';
//import the context
import {AppContext} from '../context/provider';

export default function ExplorePage() {
    //use the context to access global state and global function 
    const {state, dispatch} = useContext(AppContext);
    const [UserPicture, setUserPicture] = useState(null);
    const [DisplayName, setDisplayName] = useState("");
    const [ItemPrice, setItemPrice] = useState("10");
    const [ItemDate, setItemDate] = useState("default item date");
    const [ItemTitle, setItemTitle] = useState("default title");
    const [ItemImage, setItemImage] = useState("./placeholderProfile.png");
    const [Items, setItems] = useState([]);
    // const [username, setUserName] = useState(null)
console.log(state);
    const HandleUser = async () => {
        var resp = await axios.get('https://www.lendr-bc.me/me', {
            withCredentials: true
        })
        setDisplayName(resp.data.display_name);
        setUserPicture(resp.data.avatar_url);
        dispatch({
            type:"ChangeDisplayName",
            displayname:resp.data.display_name
        })
        var itemresp = await axios.post("https://www.lendr-bc.me/post/get-all", { idx: 0, count: 5 }, {
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });
    }

const HandleGetItems = async (name, rate) => {
    var itemresp = await axios.post("https://www.lendr-bc.me/post/get-all", {idx: 0, count: 5}, {
        headers: { crossDomain: true, 'Content-Type': 'application/json' }
    }, { withCredentials: true });
    console.log("repo data");
    console.log(itemresp.data);
    setItems([...itemresp.data]);
}
    useEffect(() => {
        HandleUser();
        HandleGetItems();
    }, [])

    return <div>
        <div className="Header">
            <div className="Header_top">
<div>Hi, {state.displayname}</div>
                <Link to="/settings">
                    <UserAvatar imgsrc={UserPicture}></UserAvatar>
                </Link>
            </div>
            <h1>Explore</h1>
            <div className="search">
                <SearchBar placeholder="Search Items" />
            </div>
            <div className="Category_cont">
                <div className="Category_header">
                    <h2>Categories</h2>
                    <Link to="/index">
                        <h6>See All</h6>
                    </Link>
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
                <h2>Recent Posts</h2>
                <Link to="/specificcategories">
                    <h6>See All</h6>
                </Link>
            </div>
            <div className="Recommended_divs">
            {
                Items.map((o,i)=>{
                    console.log("explorepage items array", o,i);
                    return <ReviewCard
                    title={o.title}
                    price={o.rate}
                    date={o.created_on}
                    bgImg={o.images}
                    />
                })
            }
            </div>
        </div>
        <div className="Saved_cont">
            <div className="Section_header">
                <h2>Recommended</h2>
                <Link to="/specificcategories">
                    <h6>See All</h6>
                </Link>
            </div>
            <div className="Recommended_divs">
            {
                Items.map((o,i)=>{
                    console.log("explorepage items array", o,i);
                    return <ReviewCard
                    title={o.title}
                    price={o.rate}
                    date={o.created_on}
                    bgImg={o.images}
                    />
                })
            }
            </div>
            {/* </div> */}
        </div>
        <div className="nav">
            <BottomNav />
        </div>
    </div>
}


// ExplorePage.defaultProps = {
//     userfname: null,
//     userpfp: null
// }

