import React from 'react';
import styled from 'styled-components';

const BubbleCont = styled.div`
width: 120px;
	height: 100px;
	border: 1px solid rgba(164, 167, 168, 0.56);
	box-sizing: border-box;
	border-radius: 10px;
	/* text-align: center; */
	box-shadow: 1px 1px 5px #333333;
	margin-top: 30px;
	margin-left: 20px;
	border: 0px;
    color: #D5D5D5;
    position:relative;
`;
const BubbleText = styled.div`
    color: #333333;
    margin-top: 5px;
    margin-left:25px;
   float:left;
   

`
const BubbleLine = styled.div`
width:110px;
border: 1px solid rgba(0, 0, 0, 0.51);
    position:absolute;
    top:30px;
`
const BubbleLine2 = styled.div`
width:110px;
border: 1px solid rgba(0, 0, 0, 0.51);
    position:absolute;
    top:57px;
`
const BubbleLine3 = styled.div`
width:110px;
border: 1px solid rgba(0, 0, 0, 0.51);
    position:absolute;
    top:88px;
`

const Bubble = ({ }) => {
    return <BubbleCont>
        <BubbleText>Rename</BubbleText>
        <BubbleLine> </BubbleLine>
        <BubbleText>Delete</BubbleText>
        <BubbleLine2> </BubbleLine2>
        <BubbleText>Unavailable</BubbleText>
        <BubbleLine3> </BubbleLine3>
        </BubbleCont>
}


export default Bubble;