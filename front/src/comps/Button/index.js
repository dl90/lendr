import React from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.div`
    max-width: 279px;
    height:45px;
    border-radius:10px;
    
    display:flex;
    justify-content:center;
    align-items:center;

    background:${props=>props.bg ? props.bg: "linear-gradient(119.69deg, rgba(57, 166, 220, 0.75) -15.26%, #39A6DC 98.97%)"};
    color:#FFF;
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);

    &:hover{
        cursor:pointer;
    }
`;

const Button = ({bg,text}) => {
    return <ButtonDiv bg={bg}>
        {text}
    </ButtonDiv>
};

Button.defaultProps = {
    bg: "linear-gradient(119.69deg, rgba(57, 166, 220, 0.75) -15.26%, #39A6DC 98.97%)",
    text:"Button"
};


export default Button;