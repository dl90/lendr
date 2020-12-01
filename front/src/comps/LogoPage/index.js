import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import BgWave from '../BgWave';
import BgWave2 from '../BgWave2';

const LogoPageDiv = styled.div`
position:fixed;
top:0;
left:0;
z-index:3;

  width:100vw;
  height:100vh;
  background:#E3E6EC;

  display:${props => props.PageDisp ? props.PageDisp:"flex"};
  opacity:${props => props.PageO ? props.PageO: 0};
  justify-content:center;
  transition: opacity 0.5s;
`;

const LogoDiv = styled.div`
position:relative;
width: 194px;
height: 200px;
margin-top:20vh;
margin-bottom:15px;

background: #E3E6EC;
box-shadow: -10px 10px 15px rgba(0, 0, 0, 0.25), 10px -10px 15px #FFFBFB;
border-radius: 10px;
opacity:${props => props.IconO ? props.IconO: 0};
transition: opacity 2s;

display:${props => props.logoDisp ? props.logoDisp:"flex"};
justify-content:center;
align-items:center;
`;

const LogoText = styled.div`
opacity:${props => props.TextO ? props.TextO: 0};
transition: opacity 2s;
`;

const LogoPage = () => {
    const [PageDisp, SetPageDisp] = useState("flex");
    const [PageO, SetPageO] = useState(1);
    const [logoDisp, SetLogoDisp] = useState("none");
    const [IconO, SetIconO] = useState(0);
    const [TextO, SetTextO] = useState(0);
    const [WavePosO, SetWavePosO] = useState("top:-200px;right:0px;transform: rotate(0deg);");
    const [WavePosB, SetWavePosB] = useState("top:-300px;right:100px;transform: rotate(0deg);");
    const [WavePosO2, SetWavePosO2] = useState("bottom:-300px;left:-100px;");
    const [WavePosB2, SetWavePosB2] = useState("bottom:-300px;left:-50px;");

    useEffect(()=>{
        SetLogoDisp("flex");
        setTimeout(function(){SetIconO(1);}, 800);
        setTimeout(function(){SetTextO(1);}, 1000);

        setTimeout(function(){SetWavePosO("top:-100px;right:50px;transform: rotate(-25deg);");}, 500);
        setTimeout(function(){SetWavePosB("top:-100px;right:165px;transform: rotate(-30deg);");}, 400);
        setTimeout(function(){SetWavePosO2("bottom:0px;left:0px;");}, 450);
        setTimeout(function(){SetWavePosB2("bottom:-5px;left:0px;");}, 500);
        setTimeout(function(){SetPageO(0);}, 3000);
        setTimeout(function(){SetPageDisp("none");}, 3500);
    });

    return <LogoPageDiv PageO={PageO} PageDisp={PageDisp}>
        <div>
        <BgWave Op={WavePosO} Bp={WavePosB}></BgWave>
        <LogoDiv IconO={IconO} logoDisp={logoDisp}><img src="/logoIcon.svg"></img></LogoDiv>
        <LogoText TextO={TextO}><img src="/logoText.png"></img></LogoText>
        <BgWave2 Op2={WavePosO2} Bp2={WavePosB2}></BgWave2>
        </div>
        
    </LogoPageDiv>
    
};

LogoPage.defaultProps = {
    PageDisp: "none",
    PageO:0,
    logoDisp: "none",
    IconO:0,
    TextO:0,
};


export default LogoPage;