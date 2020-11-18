import React from 'react';
import styled from 'styled-components';

import InputBox from '../InputBox';

const InputDiv = styled.div`
    display:flex;
    flex-direction:column;
    color: #175FA4;
`;

const Input = ({ title, placeholder, onChange, type }) => {
    return <InputDiv>
        <h2>{title}</h2>
        <InputBox type={type} placeholder={placeholder} onChange={onChange} />
    </InputDiv>
};

Input.defaultProps = {
    title: "Title",
    placeholder: "Placeholder Text",
    type: "text"
};


export default Input;