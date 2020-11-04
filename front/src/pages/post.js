import React from 'react';
import './index.scss';
import './app.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';
import UploadImg from '../comps/UploadImg';
import CategoriesDropdown from '../comps/CatagoriesDropdown';
import Button from '../comps/Button';

import BottomNav from '../comps/BottomNav';

export default function post(){
    return <div className="post">
        <Header/>
        <h1>Post Item</h1>
        <Input title={"Post Title"} placeholder="Item Name"></Input>
        <h2>Upload Photos</h2>
        <div className="images">
            <UploadImg/>
            <UploadImg/>
            <UploadImg/>
        </div>
        <h2>Categories</h2>
        <CategoriesDropdown/>
        <Input title={"Add Description"} placeholder="Write a description of the item you're renting out."></Input>
        <Input title={"Meeting Location"} placeholder="123 Main St."></Input>
        <Button text={"Post"}></Button>
        <BottomNav/>
    </div>
}