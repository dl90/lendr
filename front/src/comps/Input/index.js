import React from 'react';
import styled from 'styled-components';

const InputDiv = styled.div`
    display:flex;
    flex-direction:column;
    color: #175FA4;
`;

const InputBox = styled.input`
    display:flex;
    align-items:center;
    flex-grow:1;

    min-width:220px;
    max-width:414px;
    min-height:48px;
    padding:0px 24px;

    color: #979797;
    background: #FFFFFF;

    border: 1px solid rgba(151, 151, 151, 0.15);
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);
    border-radius: 10px;

    position:relative;
    top:-10px;
`;

const Input = ({ title, placeholder}) => {
    return <InputDiv>
        <h2>{title}</h2>
        <InputBox type="text" placeholder={placeholder}></InputBox>
    </InputDiv>
};

Input.defaultProps = {
    title: "Title",
    placeholder: "Placeholder Text"
};


export default Input;