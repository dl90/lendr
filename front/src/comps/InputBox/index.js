import React from 'react';
import styled from 'styled-components';

const InputBoxDiv = styled.input`
    display:flex;
    align-items:center;
    flex-grow:1;
    margin-top:10px;

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

const InputBox = ({ placeholder, onChange }) => {
    return <InputBoxDiv type="text" placeholder={placeholder} onChange={onChange}></InputBoxDiv>
};

InputBox.defaultProps = {
    placeholder: "Placeholder Text"
};


export default InputBox;