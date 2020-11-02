import React, {useState} from 'react';
import styled from 'styled-components';

const CatagoriesCont = styled.div`
height: 48px;
max-width: 326px;
border: 1px solid rgba(151, 151, 151, 0.26);
border-radius: ${props => props.DivRadius ? " 10px 10px 0px 0px": "10px 10px 10px 10px"};
box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);
cursor: pointer;
:hover {
    background-color: #FCFCFC;
};

`;

const CatagoriesDiv = styled.div`
max-width:300px;
display:inline-flex;
align-items:center;
padding-left:20px;
box-sizing: border-box;

img {
    position:relative;
    padding-right:20px;
    transform:${props => props.IconRotate ? "rotate(180deg);" : "none"}
};

`;

const CatagoriesLabel = styled.p`
color: #979797;
`;

const CatagoriesDropDiv = styled.div`
ul {
    list-style-type: none;
}
`;



const CatagoriesDropdown = ({}) => {
const [Dropped, setDropped] = useState(false);

    return <CatagoriesCont onClick = {()=>{
        setDropped(!Dropped);
    }}><CatagoriesDiv BgColour={Dropped} DivRadius={Dropped} IconRotate={Dropped} >
<CatagoriesLabel>Category</CatagoriesLabel>
<img alt="Dropdown Arrow" src='./dropdownarrow.png'></img>
    </CatagoriesDiv>
    
<CatagoriesDropDiv><ul>
    <li>Test</li>
    
    </ul></CatagoriesDropDiv>

</CatagoriesCont>
};

CatagoriesDropdown.defaultProps = {

};


export default CatagoriesDropdown;