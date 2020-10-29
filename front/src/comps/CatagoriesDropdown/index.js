import React from 'react';
import styled from 'styled-components';

const CatagoriesDiv = styled.div`
height: 48px;
width: 326px;
border-radius: 10px;
box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);
display:inline-flex;
align-items:center;
padding-left:20px;
box-sizing: border-box;
cursor: pointer;
img {
    position:relative;
    margin-left:220px;
}

`;

const CatagoriesLabel = styled.p`
color: #979797;
`;

const CatagoriesDropDiv = styled.div`
`;

const CatagoriesDropdown = ({}) => {
    return <div><CatagoriesDiv>
<CatagoriesLabel>Category</CatagoriesLabel>
<img src = './dropdownarrow.png'></img>
    </CatagoriesDiv>
    
<CatagoriesDropDiv></CatagoriesDropDiv>

</div>
};

CatagoriesDropdown.defaultProps = {

};


export default CatagoriesDropdown;