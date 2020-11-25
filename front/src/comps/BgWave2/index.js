import React from 'react';
import styled from 'styled-components';

const BgWave2Div = styled.div`
position:fixed;
z-index:-1;
bottom:-50px;
left:0;
`;
const WaveO = styled.img`
width:120vw;
position: absolute;
${props=>props.Op2 ? props.Op2:"bottom:0px;left:0px;"}
transition:bottom 1s,left 1s;
`;
const WaveB = styled.img`
width:120vw;
position: absolute;
${props=>props.Bp2 ? props.Bp2:"bottom:0px;left:0px;"}
transition:bottom 1s,left 1s;
`;

const BgWave2 = ({Op2, Bp2}) => {
    return <BgWave2Div>
        <WaveO src="/waveorange2.svg" Op2={Op2}></WaveO>
        <WaveB src="/waveblue2.svg" Bp2={Bp2}></WaveB>
    </BgWave2Div>
};

BgWave2.defaultPrOp2s = {
    Op2:"bottom:0px;left:0px;",
    Bp2:"bottom:0px;left:0px;"
};


export default BgWave2;