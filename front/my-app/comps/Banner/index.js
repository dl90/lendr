import React from 'react';
import styled from 'styled-components';
import icon from '../../Assest/spam.svg';


const BannerCont = styled.div`
    width: 150px;
    height: 20px;
    background: rgba(255,255,255,.8);
    display:flex;
    justify-content: center;
    padding:10px;
    box-shadow: 10px 10px 5px #888888;
`;

const BannerText = styled.div`
    p{
        margin-top:2px;
        margin-left:30px;
        color:darkblue;
        font-size:18px;
        font-family: Sans-Serif;
        font-style: normal;
    }
`;
const BannerIcon = styled.div`
height: 25px;
width: 27px;
margin-top:4.5px;
background-image: url(${icon})
`;

const Banner = ({}) => {
    return <BannerCont>
        <BannerIcon></BannerIcon>
        <BannerText>
            <p>Spam</p>
        </BannerText>
    </BannerCont>
}

export default Banner;