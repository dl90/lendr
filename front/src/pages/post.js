import React, { useState } from 'react';
// import './index.scss';
import './app.scss';
import './edit.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import UploadImg from '../comps/UploadImg';
import CategoriesDropdown from '../comps/CatagoriesDropdown';
import Button from '../comps/Button';

import BottomNav from '../comps/BottomNav';
import InputParagraph from '../comps/InputParagraph';

//import axios to get 
import axios from 'axios';

import {
    BrowserRouter as Router,
    Link,
    Route,
} from "react-router-dom";


export default function Post() {

    //Creating Use state

    // const [name, setName] = useState('');
    const [title, setTitle] = useState("");
    // const [catag, setCatag] = useState('');
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [rate, setRate] = useState("");
    const [imgs, setImg] = useState("");


    const HandleNewPost = async (title, desc, location, rate, imgs) => {
        console.log('Creating a New Post: ', "Title:", title, "Desc:", desc, "Location:", location, "Rate:", rate, "img:", imgs);

        const resp = await axios.put('https://www.lendr-bc.me/post/new-item', {
            itemName: 'New',
            itemCondition: 'good',
            itemAge: 2,
            postTitle: title,
            postDescription: desc,
            postLocation: location,
            postRate: rate,
            images: imgs,
        }, { withCredentials: true })
        console.log("item is", resp);
    }



    return <div>
        <div className="post">
            <Header />
            <h1>Post Item</h1>
            <Input title={"Post Title"} placeholder="Item Name"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            ></Input>
            <Input title={"Price"} placeholder="$20/day"
                onChange={(e) => {
                    setRate(e.target.value);
                }}
            />
        </div>

        <div className="imageDiv">
            <h2>Upload Photos</h2>
            <div className="images">
                <UploadImg
                    onChange={(e) => {
                        setImg(e.target.value);
                    }}
                />
                <UploadImg />
                <UploadImg />
            </div>
        </div>

        <div className="post">
            <CategoriesDropdown />
            <InputParagraph title={"Description"} placeholder="Write a description of the item you're renting out."
                onChange={(e) => {
                    setDesc(e.target.value);
                }}
            />
            <Input title={"Meeting Location"} placeholder="123 Main St."
                onChange={(e) => {
                    setLocation(e.target.value);
                }}
            />
            <div className="button">
                <Button text={"Post"}
                    onClick={() => {
                        HandleNewPost(title, desc, location, rate);
                    }}
                />
            </div>
        </div>

        <div className="nav">
            <BottomNav />
        </div>
    </div>
}