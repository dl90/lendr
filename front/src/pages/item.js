import React, {useState} from 'react';
import './index.scss';
import './app.scss';
import './item.scss';

import Header from '../comps/Header';
import ProfileCard from '../comps/ProfileCard';
import AskLender from '../comps/AskLender';
import BottomNav from '../comps/BottomNav';


export default function Item({Title,Price,img,Desc}){
    const [heartActive, changeHeartActive] = useState(false);
    return <div>
        <div className="item">
            <Header/>
            <div className="title">
                <h1>{Title}</h1>
                <img onClick={() => {
                    if(heartActive === false){
                        changeHeartActive(true);
                    } else {
                        changeHeartActive(false);
                    }
                }} 
                src={heartActive === true ? "/HeartActive.svg" : "/Heart.svg"}></img>
            </div>
                <h2>Price</h2>
                <p>{Price}</p>
        </div>
        
        <div className="imageDiv">
            <h2>Images</h2>
            <div className="images">
                <img src={img}></img>
                <img src={img}></img>
                <img src={img}></img>
            </div>
        </div>
        <div className="item">
            <div>
                <h2>Description</h2>
                <p>{Desc}</p>
            </div>
            <div>
                <h2>Lended By:</h2>
                <ProfileCard/>
                <AskLender/>
            </div>
            <div className="location">
                <h2>Location</h2>
                <img src={img}></img>
            </div>
        </div>
        <div className="nav">
            <BottomNav/>
        </div>
        
    </div>
}

Item.defaultProps = {
    Title: "Item Title",
    Price: "$0/Day",
    img: "/Bike.png",
    Desc:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}