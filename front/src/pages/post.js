import React from 'react';
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

export default function Post(){
    return <div>
        <div className="post">
            <Header/>
            <h1>Post Item</h1>
            <Input title={"Post Title"} placeholder="Item Name"></Input>  
            <Input title={"Price"} placeholder="$20/day"></Input>  
        </div>

        <div className="imageDiv">
            <h2>Upload Photos</h2>
            <div className="images">
                <UploadImg/>
                <UploadImg/>
                <UploadImg/>
                <UploadImg/>
                <UploadImg/>
                <UploadImg/>
                <UploadImg/>
                <UploadImg/>
                <UploadImg/>
                <UploadImg/>
            </div>
        </div>

        <div className="post">
            <CategoriesDropdown/>
            <InputParagraph title={"Description"} placeholder="Write a description of the item you're renting out."></InputParagraph>
            <Input title={"Meeting Location"} placeholder="123 Main St."></Input>
            <div className="button">
                <Button text={"Post"}></Button>
            </div>
        </div>

        <div className="nav">
            <BottomNav/>
        </div>
    </div>
}