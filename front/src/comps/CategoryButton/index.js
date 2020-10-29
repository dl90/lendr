import React from 'react';
import styled from 'styled-components';

const CategoryButtonDiv = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    align-items: center;


    width:66px;
    height:66px;

    border-radius: 10px;

    color:#39A6DC;
    background: #FFFFFF;
    box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.06);
    
    transtion: color 0.5s;

    &:hover{
        cursor:pointer;
    }
    &:active{
        background: #DCEFFB;
        box-shadow:none;
    }
`;

const Icon = styled.img`
    width: 20.5px;
    &:hover{
        cursor:pointer;
    }
`;

const Text = styled.div`
    margin: 10px 0px;
`;

const CategoryButton = ({src,text}) => {
    return <CategoryButtonDiv>
         <Icon src={src}></Icon>
         <Text>{text}</Text>
    </CategoryButtonDiv>
};

CategoryButton.defaultProps = {
};


export default CategoryButton;