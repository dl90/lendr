import React, { useEffect, useState, useContext } from 'react';
import BottomNav from '../comps/BottomNav';
import CategoryGallery from '../comps/CategoryGallery';
import Header from '../comps/Header';
import Message from '../comps/Message';
import SearchBar from '../comps/SearchBar';
import './messages.scss';
import './app.scss'

import { Link } from "react-router-dom";
import axios from 'axios';



export default function Home() {
    // const {setUserData} = useContext(UserData);
    // const handleDelete = async () => {
    //     // Here you call the setMessage function which will update state in the `Home` Component
    //     setMessage();
    // } 
    const [Msgs, setMsgs] = useState([]);

    const HandleGetItems = async (name, rate) => {
        var msgresp = await axios.post("https://www.lendr-bc.me/msg/conversations", {
            headers: { crossDomain: true, 'Content-Type': 'application/json' }
        }, { withCredentials: true });
        console.log("repo data");
        console.log(msgresp.data);

        setMsgs([...msgresp.data]);
    }

    useEffect(() => {
        HandleGetItems();
    }, [])

    return <div className="app">
        <Header />
        <h1>Messages</h1>
        <div className='search'>
            <SearchBar />
        </div>
        {
                Msgs.map((o,i)=>{
                    console.log("inside the array...", o,i);
                    return <Message
                    fullname={o.display_name}
                    />
                })
            }
        {/* <Message />
        <Message />
        <Message /> */}

        <div className="nav">
            <BottomNav active={4} />
        </div>
    </div>
}