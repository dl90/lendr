import React from 'react';
import styled from 'styled-components';
import icon from '../../Assest/spam.svg';


const BannerCont = styled.div`
width: 250px;
height: 50px;
border: 1px solid rgba(164, 167, 168, 0.56);
box-sizing: border-box;
/* border-radius: 10px; */
box-shadow: 1px 1px 5px #333333;
margin-top: 20px;
margin-left: 20px;
border: 0px;
color: #D5D5D5;
position:relative;

`;

const BannerText = styled.div`
    
        p{color: #175FA4;
        text-align: left;
     
        margin-left:90px;
        position:absolute;
        top:-4px
        }
     
    
`;
const BannerIcon = styled.div`
height: 25px;
width: 27px;
float:left;
position:absolute;
top:10px;
left:10px;
background-image: url(${icon});

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