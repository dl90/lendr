import React from 'react';
import styled from 'styled-components';
import icon from '../../Assest/notification.svg';


const BubbleCont = styled.div`
    display:inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content:space-around;
    padding-left:80px;
    padding-right:80px;
    padding-top: 10px;
    padding-bottom: 30px;
    margin-bottom: 0px;    
    background: white;
    border-radius: 5px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    line-height:200%;


`;
const BubbleIcon = styled.div`
vertical-align:text-bottom;
height: 27px;
width: 22px;
background-image: url(${icon})
`;


const BubbleText = styled.p`
margin-top:10px
font-family: sans-serif;
font-size: 18px;
color:${props => props.color ? props.color : "#175FA4"};

`;




const Bubble = ({ }) => {
    return <BubbleCont>
        <BubbleIcon></BubbleIcon>
        <BubbleText>Notifications<br/>Share with friends<br/>Log out<br/>Report<br/></BubbleText>
   
        </BubbleCont>

}

export default Bubble;