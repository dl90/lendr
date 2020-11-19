import React from 'react';
import styled from 'styled-components';

const BgWaveDiv = styled.div`
position:fixed;
z-index:-1;
top:-250px;
right:-250px
`;
const WaveO = styled.img`
position: absolute;
${props=>props.Op ? props.Op:"top:25px;right:25px;transform: rotate(0deg);"}
transition:top 1.5s,right 1.5s,rotate 1.5s;
`;
const WaveB = styled.img`
position: absolute;
${props=>props.Bp ? props.Bp:"top:0px;right:0px;transform: rotate(0deg);"}
transition:top 1s,right 1s,rotate 1s;
`;

const BgWave = ({Op, Bp}) => {
    return <BgWaveDiv>
        <WaveO src="/waveorange.svg" Op={Op}></WaveO>
        <WaveB src="/waveblue.svg" Bp={Bp}></WaveB>
    </BgWaveDiv>
};

BgWave.defaultProps = {
    Op:"top:25px;right:25px;transform: rotate(0deg);",
    Bp:"top:0px;right:0px;transform: rotate(0deg);"
};


export default BgWave;