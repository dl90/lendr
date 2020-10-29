import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
min-width:325px;
min-height:55px;
background-color: #F5F7FF;
border-radius:10px;
border:0px;
outline:none;
padding-left:25px;
color: #39A6DC; 
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
display:flex;
 ::placeholder {
    color: rgba(23, 95, 164, 0.52);
 };
 `;

const Circle = styled.div`
height: 41px;
width: 41px;
border-radius: 50%;
background: #39A6DC;
position:absolute; 
top:23px;
left:310px;
display:flex;
justify-content:center;
align-items:center;

`;

const Icon = styled.img`
width:20px;
height:20px;
margin-left:-6px;
`;

const MessageBar = () => {
    return  <div>
        <Input placeholder ="Type your message..."></Input>
        <Circle><Icon alt ="send icon" src="/sendicon.png"></Icon></Circle>
        </div>
};


export default MessageBar;