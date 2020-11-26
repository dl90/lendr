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
import { Link } from "react-router-dom";

//import axios to get
import axios from 'axios';
export default function Post() {
    //Creating Use state
    // const [name, setName] = useState('');
    const [title, setTitle] = useState("");
    // const [catag, setCatag] = useState('');
    const [desc, setDesc] = useState("");
    const [location, setLocation] = useState("");
    const [rate, setRate] = useState("");
    const [imgs, setImgs] = useState(null);

    const HandleNewPost = async (e, title, desc, location, rate, imgs) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("itemName", 'New');
        formData.append("itemCondition", 'good');
        formData.append("itemAge", 2);
        formData.append("postTitle", title);
        formData.append("postDescription", desc);
        formData.append("postLocation", location);
        formData.append("postRate", rate);
        formData.append("tag", "Electronic");
        imgs.forEach(img => formData.append("images", img))
        debugger
        console.log(imgs)

        const resp = await axios.post('https://www.lendr-bc.me/post/new-complete', formData,
            { headers: { crossDomain: true, 'Content-Type': 'multipart/form-data' } }, { withCredentials: true });
        console.log(resp);

        // const post = await axios.post('https://www.lendr-bc.me/post/get-all-own',
        //     { headers: { crossDomain: true, 'Content-Type': 'application/json' } }, { withCredentials: true })
        // console.log(post)
    }

    function eventCB(e) {
        setImgs(Array.from(e.target.files))
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
                    cbProp={eventCB}
                // onChange={(e) => {
                //     setImgs(e.target.value);
                // }}
                />
                {/* <UploadImg
                    cbProp={eventCB}
                // onChange={(e) => {
                //     setImgs(e.target.value);
                // }}
                />
                <UploadImg
                    cbProp={eventCB}
                // onChange={(e) => {
                //     setImgs(e.target.value);
                // }}
                /> */}
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
            <Link to="/lending">
                <div className="button">
                    <Button text={"Post"}
                        onClick={(e) => {
                            HandleNewPost(e, title, desc, location, rate, imgs);
                        }}
                    />
                </div>
            </Link>
        </div>
        <div className="nav">
            <BottomNav active={3} />
        </div>
    </div>
}
