import React from 'react';
import styled from 'styled-components';

const SmallButtonDiv = styled.div`
    width: 101px;
    height:35px;
    border-radius:5px;
    
    display:flex;
    justify-content:center;
    align-items:center;

    background-color:${props=>props.bgcolor ? props.bgcolor: "#DCEFFB"};
    color:${props=>props.color ? props.color:"#39A6DC"};

    &:hover{
        cursor:pointer;
    }
`;

const SmallButton = ({bgcolor, color,text}) => {
    return <SmallButtonDiv bgcolor={bgcolor} color={color}>
        {text}
    </SmallButtonDiv>
};

SmallButton.defaultProps = {
    bgcolor: "#DCEFFB",
    color: "#39A6DC",
    text:"Button"
};


export default SmallButton;