import React from 'react';
import styled from 'styled-components';

const InputParagraphDiv = styled.div`
    display:flex;
    flex-direction:column;
    color: #175FA4;
`;

const InputParagraphBox = styled.textarea`
    display:flex;
    align-items:center;
    flex-grow:1;

    min-width:220px;
    max-width:414px;
    min-height:48px;
    padding:10px 24px;

    color: #979797;
    background: #FFFFFF;

    border: 1px solid rgba(151, 151, 151, 0.15);
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);
    border-radius: 10px;

    position:relative;
    top:-10px;
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    color: #979797;
`;

const InputParagraph = ({ title, placeholder}) => {
    return <InputParagraphDiv>
        <h2>{title}</h2>
        <InputParagraphBox type="text" placeholder={placeholder}></InputParagraphBox>
    </InputParagraphDiv>
};

InputParagraph.defaultProps = {
    title: "Title",
    placeholder: "Placeholder Text"
};


export default InputParagraph;