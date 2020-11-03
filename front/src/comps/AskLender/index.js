import React from 'react';
import styled from 'styled-components';



const LenderDiv = styled.div`
height: 103px;
max-width: 325px;
min-width: 250px;
border-radius: 10px;
box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);
display:flex;
justify-content:center;
flex-direction:column;
padding-left:25px;
`;

const MessageInput = styled.input`
height: 41px;
max-width: 279px;
min-width: 190px;
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
margin-bottom: 10px;
`;

const Header = styled.p`
margin:0px;
position: relative;
left: 10px;
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