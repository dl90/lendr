import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
const MenuCont = styled.div`
max-width: 304px;
min-height: 186px;
border-radius: 10px;
// box-shadow: 1px 1px 5px #333333;
box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.1);


padding:20px;
display:flex;
flex-direction:column;
justify-content:space-between;
background-color:white; 
overflow:hidden;
`;


const Menu2 = styled.div`
display:flex;
align-items: center;
`
const Menu3 = styled.div`
align-items: center;
display:flex;  
`
const Menu4 = styled.div`
display:flex;
align-items: center;
`
const Menu5 = styled.div`
display:flex;
align-items: center;
`

const MenuText = styled.div`
color: #175FA4;
display:flex;
align-items: center;
margin-left:6%;
font-size:18px;
`


const LogOut = async () => {
    var resp = await axios.post('https://www.lendr-bc.me/auth/logout')
}


const Menu = ({ notification, share, logout, report }) => {
    return <MenuCont>
        <Menu2>
            <img src={notification}></img>
            <MenuText>Notifications</MenuText>
        </Menu2>

        <Menu3>
            <img src={share}></img>
            <MenuText>Share With Friends</MenuText>
        </Menu3>
       
        <Menu4 onClick={LogOut}>
            <img src={logout}></img>
            <MenuText>Log Out</MenuText>
        </Menu4>
      
        <Menu5>
            <img src={report}></img>
            <MenuText>Report</MenuText>
        </Menu5>

    </MenuCont>
}

Menu.defaultProps = {
    notification: './notification.svg',
    share: './user.svg',
    logout: './log_out.svg',
    report: './report.svg',
}

export default Menu;