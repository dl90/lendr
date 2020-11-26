import React, { useState } from 'react';
import styled from 'styled-components';

const CatagoriesCont = styled.div`
display:flex;
height: 48px;
max-width: 414px;
padding: 0px 20px;
border: 1px solid rgba(151, 151, 151, 0.26);
border-radius: ${props => props.DivRadius ? " 10px 10px 0px 0px" : "10px 10px 10px 10px"};
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
display:flex;
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




const CatagoriesForm = styled.form`
height: 48px;
select::-ms-expand{
    display:none;
}
appearance: none;
`;

const CatagoriesSelect = styled.select`
height: 48px;
min-width: 325px;
padding: 0px 20px 0px 20px;
border: 1px solid rgba(151, 151, 151, 0.26);
border-radius: ${props => props.DivRadius ? " 10px 10px 0px 0px" : "10px 10px 10px 10px"};
box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06);
cursor: pointer;
appearance: none;
:hover {
    background-color: #FCFCFC;
};
select::-ms-expand{
    display:none;
}

`;

const DropDown = styled.div`
width:100%;

`;


const CatagoriesDropdown = ({ test, onChange }) => {
    const [Dropped, setDropped] = useState(false);
    const [cat, setCat] = useState("Category");

    /*return <DropDown>
        <h2>Categories</h2>

        <CatagoriesForm>
            <CatagoriesSelect name="cars" id="cars" onChange={onChange}>
                <option value="Choose a Category" disabled selected>Choose a Category</option>
                <option value="Automobile">Automobile</option>
                <option value="Appliance">Appliances</option>
                <option value="Electronic">Electronic</option>
                <option value="Furniture">Furniture</option>
                <option value="Recreation">Recreation</option>
                <option value="Sports">Sports</option>
                <option value="Tools">Tools</option>
                <option value="Venues">Venues</option>
            </CatagoriesSelect>
        </CatagoriesForm>
        <br></br>
        <br></br>
        */
    return <DropDown><CatagoriesCont BgColour={Dropped} DivRadius={Dropped} onClick={() => {
        setDropped(!Dropped);
    }}>
        <CatagoriesDiv IconRotate={Dropped} >
            <CatagoriesLabel>{cat}</CatagoriesLabel>
            <img alt="Dropdown Arrow" src='./dropdownarrow.png'></img>
        </CatagoriesDiv>
    </CatagoriesCont>
        <CatagoriesDropDiv DisplayDrop={Dropped} ><ul>
            <li onClick={() => {
                setCat("Automobile")
                onChange("Automobile")
                setDropped(false);
            }}>Automobile</li>
            <li onClick={() => {
                setCat("Appliances")
                onChange("Appliances")
                setDropped(false);
            }}>Appliances</li>
            <li onClick={() => {
                setCat("Electronic")
                onChange("Electronic")
                setDropped(false);
            }}>Electronic</li>
            <li onClick={() => {
                setCat("Furniture")
                onChange("Furniture")
                setDropped(false);
            }}>Furniture</li>
            <li onClick={() => {
                setCat("Recreation")
                onChange("Recreation")
                setDropped(false);
            }}>Recreation</li>
            <li onClick={() => {
                setCat("Sports & Fitness")
                onChange("Sports")
                setDropped(false);
            }}>Sports &amp; Fitness</li>
            <li onClick={() => {
                setCat("Tools")
                onChange("Tools")
                setDropped(false);
            }}>Tools</li>
            <li onClick={() => {
                setCat("Venues")
                onChange("Venues")
                setDropped(false);
            }}>Venues</li>
        </ul>
        </CatagoriesDropDiv>


    </DropDown>
};

CatagoriesDropdown.defaultProps = {
    test: "none",
    onChange: () => { }
};


export default CatagoriesDropdown;