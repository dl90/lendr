import React from 'react';
import styled from 'styled-components';


const ReportDiv = styled.div`
height: 191px;
max-width: 325px;
display:flex;
flex-direction:column;
align-items:center;

border-radius: 10px;
box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
`;

const ReportHeaderDiv = styled.div`
color:#175FA4;
margin-top:12px;
background-color:red;
width:100%;

`;
const ReportHeader = styled.h2`
margin:0px;

`;
const ReportSubheader = styled.h4`
margin:0px;

`;

const ReportSelectionDiv = styled.div`
display:flex;
align-items:center;
justify-content:center;
width:100%;

margin-top:20px;
ul {
    width:100%;
    height:100%;
    list-style-type: none;
    background-color:gray;  
    display:flex;
    flex-direction:column; 
  
};

li {
    color:#175FA4;
    display:flex;
    align-items:center;
    flex:1;
margin-bottom:10px;

img {
    margin-right:20px;
}
    
}

`;
const ReportMenu = () => {
    return <ReportDiv>
<ReportHeaderDiv>
<ReportHeader>Report Post</ReportHeader>
<ReportSubheader>Why are you reporting this post?</ReportSubheader>
</ReportHeaderDiv>

<ReportSelectionDiv>
<ul>
    <li> <img src = "/spamicon.png"></img>It's Spam</li>
    <li>  <img src = "/inappropiateicon.png"></img>It's inappropiate</li>
</ul>
</ReportSelectionDiv>


    </ReportDiv>
};

ReportMenu.defaultProps = {
   
};


export default ReportMenu;