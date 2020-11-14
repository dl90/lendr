import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
min-height: 188px;
min-width:195px;
max-width:150px;
margin-right: 24px;
background-color: #DCEFFB;
border-radius:10px;
background-image: url("${props => props.bgImg}");
background-size: cover;
background-repeat: no-repeat;
background-position: center;
overflow:hidden;
box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
margin-bottom:30px;
`;

const Item = styled.div`
padding:7px 14px 3px 8px;
max-width:195px;
min-height:35px;
background-color:white;
position:relative;
top:132px;
border-radius:0 0 10px 10px;
`;

const Title = styled.div`

h4{
    margin:auto;
    width: 1000%;
    text-transform: capitalize;
}
`;

const Date = styled.div`
font-size:9px;
text-align:right;
position relative;
bottom:0;
`;

//Title is the items name
//Date is the date the item was uploaded in weeks
//bgImg is the name of the image

const ReviewCard = ({ title, date, bgImg }) => {
    return <Card bgImg={bgImg} onClick="">
        <Item  >
            <Title><h4>{title}</h4></Title>
            <Date><p>{date}</p></Date>
        </Item>
    </Card>
};

ReviewCard.defaultProps = {
    title: "title (20 letters max)",
    date: "uploaded ...   weeks ago",
    // bgImg: './placeholderProfile.png',
};


export default ReviewCard;