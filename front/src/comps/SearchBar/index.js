import React from 'react';
import styled from 'styled-components';

const SearchDiv = styled.div`
height: 48px;
max-width: 323px;
display:flex;
border: 1px solid rgba(151, 151, 151, 0.15);
align-items:center;
border-radius:10px;
background-color: #F5F7FF;
box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.06);
padding-left:20px;
box-sizing:border-box;
img {
    margin-right:20px;
}
`;

const SearchInput = styled.input`
height:85%;
width:70%;
overflow: hidden;   
background-color: #F5F7FF;
border:0px;
outline:none;
color: #39A6DC; 
display:flex;
border-radius:10px;
color:#979797;

 ::placeholder {
    color: #979797;

 };
 `;

 const Icon = styled.img`
 `;
const SearchBar = ({placeholder}) => {
    return <SearchDiv>
          <Icon src ="/searchicon.png"></Icon>
        <SearchInput placeholder ={placeholder}></SearchInput>
      
    </SearchDiv>
};

SearchBar.defaultProps = {
    placeholder: "Search"
};


export default SearchBar;