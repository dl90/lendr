import React, {useState} from 'react';
import styled from 'styled-components';

const CatagoriesCont = styled.div`
display:flex;
height: 48px;
max-width: 414px;
padding: 0px 20px;
border: 1px solid rgba(151, 151, 151, 0.26);
border-radius: ${props => props.DivRadius ? " 10px 10px 0px 0px": "10px 10px 10px 10px"};
box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);
cursor: pointer;
:hover {
    background-color: #FCFCFC;
};

`;

const CatagoriesDiv = styled.div`
max-width: 414px;
display:flex;
align-items:center;
flex-grow:1;
box-sizing: border-box;
justify-content:space-between;
padding-right:5px;
img {
    position:relative;
    
    transform:${props => props.IconRotate ? "rotate(180deg);" : "none"}
};

`;

const CatagoriesLabel = styled.p`
color: #979797;
`;

const CatagoriesDropDiv = styled.div`
border: 1px solid rgba(151, 151, 151, 0.26);
min-height:260px;
max-width: 414px;
background-color:white;
position:relative;
display:${props => props.DisplayDrop ? "flex" : "none"};
box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);
top: -1px;
ul {
    list-style-type: none;
    width:100%;
    position:relative;
   margin-left:-40px;

}

li {
    display:flex;
    align-items:center;
    padding-left:20px;
    min-height:50px;
    width:100%;
    position:relative;
    box-sizing: border-box;
    cursor:pointer;
    &:hover {
        background-color:#39A6DC;
        color:white;
    }
}
`;



const CatagoriesDropdown = ({test}) => {
const [Dropped, setDropped] = useState(false);

    return <div>
        <h2>Categories</h2>
        <CatagoriesCont BgColour={Dropped} DivRadius={Dropped} onClick = {()=>{
            setDropped(!Dropped);
        }}>
            <CatagoriesDiv IconRotate={Dropped} >
                <CatagoriesLabel>Category</CatagoriesLabel>
                <img alt="Dropdown Arrow" src='./dropdownarrow.png'></img>
            </CatagoriesDiv>
        </CatagoriesCont>
        <CatagoriesDropDiv DisplayDrop = {Dropped} ><ul>
            <li>Automobile</li>
            <li>Appliances</li>
            <li>Electronic</li>
            <li>Furniture</li>
            <li>Recreation</li>
            <li>Sports &amp; Fitness</li>
            <li>Tools</li>
            <li>Venues</li>
            </ul>
        </CatagoriesDropDiv>
    </div>
};

CatagoriesDropdown.defaultProps = {
test:"none"
};


export default CatagoriesDropdown;