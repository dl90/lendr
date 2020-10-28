import React from 'react';
import styled from 'styled-components';


const MessageDiv = styled.div`

`;
const Input = styled.input`
width: 325px;
height:55px;  
background-color: #F5F7FF;
border-radius:10px;
border:0px;
outline:none;
padding-left:25px;
color: #39A6DC; 
display:flex;
 ::placeholder {
    color: rgba(23, 95, 164, 0.52);
 }
 box-shadow: 0px 4px 4px 0px #000000 25%;
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
    return  <MessageDiv>
        <Input placeholder ="Type your message..."></Input>
        <Circle><Icon src = "/sendicon.png"></Icon></Circle>
        </MessageDiv>
};


export default MessageBar;