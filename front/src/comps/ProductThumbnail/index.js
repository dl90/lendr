import React from 'react';
import styled from 'styled-components';

import {Link} from 'react-router-dom';

const CardDiv = styled.div`

`;

const CardTextBox = styled.div`
height: 64.85998535156274px;
max-width: 324.9391174316419px;
border-radius: 0px 0px 10px 10px;
background-color:#DCEFFB;
box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
position:relative;
top:-10px;
box-sizing:border-box;
padding-top:10px;   
padding-left:15px;
h2 {
    color: #175FA4;
}

h4 {
    color: #808080;
}
`;

const Circle = styled.div`
height: 70px;
max-width: 70px;
border-radius: 999px;
position:relative;
background-color:#39A6DC;
left:220px;
bottom:100px;
display:flex;
justify-content:center;
align-items:center;
overflow:hidden;
&:hover {
    background-color:#2C8EBF;
}

img {
    width:100%;
    height:100%;
}


`;

const Title = styled.h2`
margin:0px;
`;

const Price = styled.h4`
margin:0px;
`;


const ItemThumbnail = styled.div`
height: 148.27999877929688px;
max-width: 324.9391174316406px;
border-radius: 10px;
display:flex;
justify-content:center;
align-items:center;
`;

const Img = styled.img`
width:100%;
height:100%;
border-radius: 10px;
`;

const UserDiv = styled.div`

`;

const Username = styled.p`
position:relative;
padding-left:220px;
bottom:110px;
`;


const ProductThumbnail = ({itemname, price, img, pfp, username}) => {
    return <Link to="/item">
<CardDiv>
    <ItemThumbnail><Img src={img}></Img></ItemThumbnail>
<CardTextBox>
<Title>{itemname}</Title>
<Price>{price}</Price>
<Circle><img src = {pfp}></img></Circle>
<Username>{username}</Username>
</CardTextBox>
<UserDiv>
</UserDiv>
</CardDiv>
</Link>
};  

ProductThumbnail.defaultProps = {
    itemname: "Rental Item",
    price: "$10/day",
    img: "/placeholderProfile.png",
    pfp:"/placeholderProfile.png",
    username: "John Doe"
};


export default ProductThumbnail;