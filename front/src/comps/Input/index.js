import React from 'react';
import styled from 'styled-components';

import InputBox from '../InputBox';

const InputDiv = styled.div`
    display:flex;
    flex-direction:column;
    color: #175FA4;
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