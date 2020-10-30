import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
    display:flex;
    justify-content:space-between;
    align-items: center;

    max-width: 325px;
`;

const Back = styled.img`
    width: 21.5px;
    &:hover{
        cursor:pointer;
    }
    &:active{
        opacity:0.5;
    }
`;

const Options = styled.img`
    width: 30px;
    &:hover{
        cursor:pointer;
    }
    &:active{
        opacity:0.5;
    }
`;

const Header = () => {
    return <HeaderDiv>
        <Back src={"/back.svg"}></Back>
        <Options src={"/options.svg"}></Options>
    </HeaderDiv>
};

Header.defaultProps = {
};


export default Header;