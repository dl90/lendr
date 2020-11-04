import React from 'react';
import styled from 'styled-components';

import icon from '../../Assest/notification.svg';
import friend from '../../Assest/user.svg';
import log from '../../Assest/log_out.svg';
import report from '../../Assest/report.svg'


const MenuCont = styled.div`
width: 200px;
height: 150px;
border: 1px solid rgba(164, 167, 168, 0.56);
box-sizing: border-box;
border-radius: 10px;
/* text-align: center; */
box-shadow: 1px 1px 5px #333333;
margin-top: 30px;
margin-left: 20px;
border: 0px;
color: #D5D5D5;
position: relative;


`;


const Menu2 = styled.div`
height: 27px;
width: 22px;
margin-left:10px;

background-image: url(${icon})
`
const Menu3 = styled.div`
vertical-align:text-bottom;
height: 19px;
width: 20px;
margin-top:7px;
margin-left:12px;  

background-image: url(${friend})

`
const Menu4 = styled.div`
vertical-align:text-bottom;
height: 21px;
width: 20px;
margin-top:7px;
margin-left:12px;

background-image: url(${log})

`
const Menu5 = styled.div`
vertical-align:text-bottom;
height: 22px;
width: 22px;
margin-top:7px;
margin-left:12px;
background-image: url(${report})

`

const MenuText = styled.div`
color: #175FA4;
width: 160px;
margin-left:40px ;

float:left;

`





const Menu = ({ }) => {
    return <MenuCont>
        <Menu2>
        <MenuText>Notifications</MenuText>
        </Menu2>
    
        <Menu3>
            <MenuText>Share With Friends</MenuText>
        </Menu3>
        <Menu4>
        <MenuText>Log Out</MenuText>
        </Menu4>
        <Menu5>
        <MenuText>Report</MenuText>
        </Menu5>
   
        </MenuCont>
}


export default Menu;