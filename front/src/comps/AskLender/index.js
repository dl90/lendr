import React from 'react';
import styled from 'styled-components';



const LenderDiv = styled.div`
display:flex;
justify-content:center;
flex-direction:column;

height: 103px;
max-width: 325px;
min-width: 245px;

border-radius: 10px;
box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);

padding-left:25px;
margin-top:25px;
`;

const HeaderDiv = styled.div`
display:flex;
max-width: 200px;
margin-bottom: 10px;
`;

const Header = styled.p`
margin:0px;
position: relative;
left: 10px;
`;

const Message = styled.div`
display:flex;
`;

const MessageInput = styled.input`
flex-grow:1;

height: 41px;
max-width: 300px;
min-width: 190px;
border:none;
outline:none;
border: 1px solid rgba(151, 151, 151, 0.15);
border-radius: 10px;
background-color:#F5F7FF;
display:flex;
box-sizing:border-box;
padding-left:15px;
::placeholder {
    color: rgba(23, 95, 164, 0.52);
 };

`;


const Circle = styled.div`
position:relative;
top:3px;
left:-40px;

height: 35px;
width: 35px;
border-radius: 50%;
background: #39A6DC;
display:flex;
justify-content:center;
align-items:center;

&:active {
    background: #258CBF;
}

`;

const Icon = styled.img`
width:20px;
height:20px;
margin-left:-6px;
`;

const AskLender = ({}) => {
    return <LenderDiv>
    <HeaderDiv>
        <img src="/sendiconblue.png"></img>
        <Header>Ask the Lender!</Header>
    </HeaderDiv>

    <Message>
        <MessageInput placeholder = "When can I check this out?"></MessageInput> 
        <Circle><Icon draggable="false" src="/sendicon.png"></Icon></Circle>
    </Message>
</LenderDiv>
}
AskLender.defaultProps = {
  
};


export default AskLender;