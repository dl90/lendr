import React, { useState } from 'react';
import './index.scss';
import './app.scss';
import './edit.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import UploadImg from '../comps/UploadImg';
import CategoriesDropdown from '../comps/CatagoriesDropdown';
import Button from '../comps/Button';

import BottomNav from '../comps/BottomNav';
import InputParagraph from '../comps/InputParagraph';

import axios from 'axios';
export default function Post() {

    // const [name, setName] = useState('');
    const [title, setTitle] = useState("");
    // const [catag, setCatag] = useState('');
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");

    const HandleNewPost = async (title, desc, location) => {
        console.log('Creating a New Post: ', title, desc, location,);

        var resp = await axios.post('http://ec2-44-242-43-38.us-west-2.compute.amazonaws.com/post/new-item/', {
            itemName: 'Test Name',
            postTitle: title,
            postDescription: desc,
            postLocation: location,
        })
        console.log(resp.data);
    }


    return <div>
        <div className="post">
            <Header />
            <h1>Post Item</h1>
            <Input title={"Post Title"} placeholder="Item Name"
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
            />
        </div>

        <div className="imageDiv">
            <h2>Upload Photos</h2>
            <div className="images">
                <UploadImg />
                <UploadImg />
                <UploadImg />
                <UploadImg />
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
                        HandleNewPost(title, desc, location);
                    }}
                />
            </div>
        </div>

        <div className="nav">
            <BottomNav />
        </div>
    </div>
}