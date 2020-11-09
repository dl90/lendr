import React from 'react';
import styled from 'styled-components';

const CategoryThumbnailDiv = styled.div`
    width:151.4px;
    height:162px;
    border-radius: 10px;
    overflow:hidden;

    background: url(${props=>props.src ? props.src : "/defaultCategory.jpg"});
    background-repeat: no-repeat;

    margin-bottom: 15px;
`;

const Overlay = styled.div`
    width:100%;
    height:100%;
    background: rgba(23, 88, 150, 0.35);

    color:white;
    padding:20px 10px;
    opacity:1;
    transition:0.3s ease;

    &:hover{
        opacity:0;
    }
`;

const CategoryThumbnail = ({src,text}) => {
    return <CategoryThumbnailDiv src={src}>
         <Overlay><h5>{text}</h5></Overlay>
        {/* <Title>Category</Title> */}
    </CategoryThumbnailDiv>
};

CategoryThumbnail.defaultProps = {
    src:"/defaultCategory.jpg",
    text:"Category"
};


export default CategoryThumbnail;