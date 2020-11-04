import React from 'react';
import styled from 'styled-components';
import heart from '../../Assest/Heart.svg';
import heartactive from '../../Assest/Heart2.svg'


const HeartPart = styled.div`
width: 120px;
height: 50px;
`

const HeartCont = styled.div`
height: 35px;
width: 38px;
margin-left:10px;
margin-top:10px;
float:left;
background-image: url(${heart})


`;
const HeartActive = styled.div`
height: 35px;
width: 38px;
float:left;
margin-top:10px;
background-image: url(${heartactive})


`


const Heart = ({ }) => {
    return <HeartPart>
        <HeartCont></HeartCont>
    <HeartActive></HeartActive>
    </HeartPart>
        
}

export default Heart;