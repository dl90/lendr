import React, {useState} from 'react';
import styled from 'styled-components';

const LikeDiv = styled.img`

`;

const Like = () => {
    const [heartActive, changeHeartActive] = useState(false);
    return <LikeDiv onClick={() => {
        if(heartActive === false){
            changeHeartActive(true);
        } else {
            changeHeartActive(false);
        }
    }} 
    src={heartActive === true ? "/HeartActive.svg" : "/Heart.svg"}>
    </LikeDiv>
};

Like.defaultProps = {
};


export default Like;