import React from 'react';
import styled from 'styled-components';



const LenderDiv = styled.div`
height: 103px;
max-width: 325px;
border-radius: 10px;
box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
`;

const MessageInput = styled.input`
height: 41px;
max-width: 279px;
border:none;
outline:none;
border-radius: 10px;
background-color:#F5F7FF;
display:flex;
width:80%;
box-sizing:border-box;
padding-left:15px;

::placeholder {
    color: rgba(23, 95, 164, 0.52);
 };

`;

const HeaderDiv = styled.div`
display:flex;
position:relative;
top:-10px;
left:-70px;
`;

const Header = styled.p`
margin:0px;
`;

const AskLender = ({}) => {
    return <LenderDiv>
<HeaderDiv>
    <img src="/sendiconblue.png"></img>
    <Header>Ask the Lender!</Header>
</HeaderDiv>

<MessageInput placeholder = "When can I check this out?"></MessageInput> 
    </LenderDiv>
}
AskLender.defaultProps = {
  
};


export default AskLender;