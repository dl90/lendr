import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
max-width:414px;
min-height:76px;
box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
display:flex;
align-items: center;
justify-content: space-evenly;
background-color:white;
`;

const MessageDiv = styled.div`
max-width: 325px;
min-height:55px;
background-color:blue;
display:flex;
align-items:center;
border-radius:10px;
background-color: #F5F7FF;
box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
flex-grow:1;
`;

const Input = styled.input`
max-width:250px;
height:55px;
overflow: hidden;
background-color: #F5F7FF;
border:0px;
outline:none;
padding-left:25px;
color: #39A6DC;
display:flex;
border-radius:10px;
 ::placeholder {
    color: rgba(23, 95, 164, 0.52);
 };
 `;

const Circle = styled.button`
min-height: 41px;
min-width: 41px;
border-radius: 50%;
background: #39A6DC;
margin-left: auto;
margin-right:7px;
display:flex;
justify-content:center;
align-items:center;

&:active {
    background: #258CBF;
}


 img {
 }

`;

const Icon = styled.img`
width:20px;
height:20px;
margin-left:-6px;
`;

const MessageBar = ({id}) => {
    return <Bar>
         <form id={id}>
        <MessageDiv>
            <Input id="message" placeholder="Type your message..."></Input>
            <Circle type="submit" form={id}><Icon draggable="false" src="/sendicon.png"></Icon></Circle>
        </MessageDiv>
        </form>
    </Bar>
    
};


export default MessageBar;