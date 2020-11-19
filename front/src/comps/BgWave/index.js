import React from 'react';
import styled from 'styled-components';

const BgWaveDiv = styled.div`
width:100vw;
height:100vh;
position:fixed;
z-index:-1;
top:-25px;
`;
const WaveO = styled.img`
position: absolute;
top:0;
right:0;
`;
const WaveB = styled.img`
position: absolute;
top:0;
right:0;
`;

const BgWave = () => {
    return <BgWaveDiv>
        <WaveO src="/waveorange.svg"></WaveO>
        <WaveB src="/waveblue.svg"></WaveB>
        
    </BgWaveDiv>
};

BgWave.defaultProps = {
};


export default BgWave;