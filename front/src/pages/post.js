import React from 'react';
import './index.scss';

import Header from '../comps/Header';
import Input from '../comps/Input';

import BottomNav from '../comps/BottomNav';

export default function post(){
    return <div className="post">
        <Header/>
        <Input title={"Post Item"} placeholder="Item Name"></Input>
        <BottomNav></BottomNav>
    </div>
}