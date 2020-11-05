import React from 'react';
import styled from 'styled-components';


const CardDiv = styled.div`

`;

const CardTextBox = styled.div`
height: 64.85998535156274px;
max-width: 324.9391174316419px;
border-radius: 0px 0px 10px 10px;
background-color:white;
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
left:240px;
bottom:115px;
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
left:245px;
bottom:120px;
`;

const ProductThumbnail = ({itemname, price, img, pfp, username}) => {
    return <div>
<CardDiv>
    <ItemThumbnail><Img src={img}></Img></ItemThumbnail>
<CardTextBox>
<Title>{itemname}</Title>
<Price>{price}</Price>
</CardTextBox>
<UserDiv>
<Circle><img src = {pfp}></img></Circle>
<Username>{username}</Username>
</UserDiv>
</CardDiv>
    </div>
};  

ProductThumbnail.defaultProps = {
    itemname: "Rental Item",
    price: "$10/day",
    img: "/test.jpg",
    pfp:"/placeholderProfile.png",
    username: "John Doe"
};


export default ProductThumbnail;