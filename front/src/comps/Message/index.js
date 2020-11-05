import React, { useState } from 'react';
import styled from 'styled-components';

const MessageDiv = styled.div`
max-height: 98px;
min-height: 98px;
max-width: 345px;
display:flex;
justify-content:center;
align-items:center;
box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.03);
background-color: ${props => props.Hovered ? "lightgray" : "white"};
transition: background-color 0.5s;
border-bottom: 1px solid rgba(0, 0, 0, 0.050);
padding-left:15px;
box-sizing:border-box;
`;

const ProfilePic = styled.div`
max-height: 50px;
max-width: 50px;
border-radius:50%;
background-color:gray;
overflow: hidden;
display:flex;
justify-content:center;
align-items:center;

img{
    width:100%;
    height:100%
 }
`;

const TextContent = styled.div`
margin-left:10px;
min-width:200px;
max-height:98px;
display:flex;
flex-direction:column;
justify-content:center;
`;

const Name = styled.h3`
color: #175FA4;
margin:0px;
`;

const LastMsg = styled.p`
color: #979797;
margin:0px;
display:inline;
height:20px;
overflow:hidden;
`;

const Date = styled.p`
margin-top:-5px;
margin-right:20px;
color:#39A6DC;
width:100px;
overflow:hidden;
text-align:right;
`;

const Message = ({ fullname, lastmsg, date, pfp }) => {
    const [Hovered, setHovered] = useState(false);
    return <MessageDiv Hovered={Hovered} onMouseOver={() => {
        setHovered(true);
    }} onMouseOut={() => {
        setHovered(false);
    }}>
        <ProfilePic><img src={pfp} alt="User Profile Picture"></img></ProfilePic>
        <TextContent>
            <Name>{fullname}</Name>
            <LastMsg>{lastmsg}</LastMsg>
        </TextContent>
        <Date>{date}</Date>
    </MessageDiv>
};

Message.defaultProps = {
    fullname: "John Smith",
    lastmsg: "This is the last message sent from this use...",
    date: "Wed.",
    pfp: "./placeholderProfile.png"
}


export default Message;