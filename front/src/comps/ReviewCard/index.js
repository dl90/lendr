import React from 'react';
import styled from 'styled-components';


const Card = styled.div`
max-width:196px;
min-height:184px;
background-color: blue;
border-radius:10px;
background-image: url("${props => props.bgImg}");
background-size: cover;
background-repeat: no-repeat;
background-position: center;
overflow:hidden;
box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
`;

const Item = styled.div`
padding:7px 14px 3px 8px;
max-width:195px;
min-height:35px;
background-color:white;
position:relative;
top:129px;
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
    bgImg: './placeholderProfile.png',
};


export default ReviewCard;