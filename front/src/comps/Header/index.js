import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
    display:flex;
    align-items: center;
    max-width:414px;
    
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

const Space = styled.div`
    flex-grow:1;
`;

const Options = styled.img`
    display:${props=>props.options ? props.options : "block"};
    width: 30px;
    &:hover{
        cursor:pointer;
    }
    &:active{
        opacity:0.5;
    }
`;

const Header = ({options}) => {
    return <HeaderDiv>
        <Back src={"/back.svg"}></Back>
        <Space></Space>
        <Options src={"/options.svg"} options={options}></Options>
    </HeaderDiv>
};

Header.defaultProps = {
    options: "block"
};


export default Header;