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
height: 40.716819763183594px;
max-width: 40.77244567871094px;
border-radius: 999px;
position:relative;
background-color:#39A6DC;
left:260px;
bottom:95px;
display:flex;
justify-content:center;
align-items:center;

&:hover {
    background-color:#2C8EBF;
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

const ItemCard = ({itemname, price, img}) => {
    return <div>
<CardDiv>
    <ItemThumbnail><Img src={img}></Img></ItemThumbnail>
<CardTextBox>
<Title>{itemname}</Title>
<Price>{price}</Price>
</CardTextBox>
<Circle><img src = "/editicon.png"></img></Circle>
</CardDiv>
    </div>
};  

ItemCard.defaultProps = {
    itemname: "Rental Item",
    price: "$10/day",
    img: "#DCEFFB"
};


export default ItemCard;