import React from 'react';
import styled from 'styled-components';


const ButtonComp = styled.div`
    color:#FFF;
    padding: 5px;
`;

const ButtonBox = styled.div`
    background-color: ${props=>props.bccolor ? props.bccolor : "FFFFFF"};

    width: 325px;
    height: 52px;
    left: 813px;
    top: 1227px;
`;

const WhiteBox = styled.div`
    height: 41.59016036987305px;
    width: 44.54135513305664px;
    background-color:white;
    position:absolute;
    left:18px;
    display:flex;
    justify-content:center;
    align-items:center;
`;

const IconBox = styled.div `
    height: 18px;
    width: 20px;
    background-image: url(${logo})
`

const Buttons = ({color,bccolor,text,}) =>{
    return <ButtonBox bccolor={bccolor}>
        <WhiteBox><IconBox></IconBox></WhiteBox>
        <ButtonComp color={color}>{text}</ButtonComp>
    </ButtonBox>
    
}



export default Spam;