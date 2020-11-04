import React, {useState} from 'react';
import styled from 'styled-components';

const MyLendsButtonsDiv = styled.div`
    display:flex;
    justify-content: space-between;

    max-width:325px;
`;

const SmallButtonDiv = styled.div`
    width: 101px;
    height:35px;
    border-radius:5px;
    
    display:flex;
    justify-content:center;
    align-items:center;

    background-color:${props=>props.bgcolor ? props.bgcolor: "#DCEFFB"};
    color:${props=>props.color ? props.color:"#39A6DC"};

    &:hover{
        cursor:pointer;
    }
`;

const MyLendsButtons = () => {
    const [MyLendsActive, changeMyLendsActive] = useState(1);
    return <MyLendsButtonsDiv>
        <SmallButtonDiv 
            onClick={() => {changeMyLendsActive(1) }}
                bgcolor={MyLendsActive === 1 ? "#175FA4" : "#DCEFFB"}
                color={MyLendsActive === 1 ? "#FFF" : "#175FA4"}
        >{"Available"}</SmallButtonDiv>
        <SmallButtonDiv 
            onClick={() => {changeMyLendsActive(2) }}
            bgcolor={MyLendsActive === 2 ? "#175FA4" : "#DCEFFB"}
            color={MyLendsActive === 2 ? "#FFF" : "#175FA4"}
        >{"On Loan"}</SmallButtonDiv>
        <SmallButtonDiv 
            onClick={() => {changeMyLendsActive(3) }}
            bgcolor={MyLendsActive === 3 ? "#175FA4" : "#DCEFFB"}
            color={MyLendsActive === 3 ? "#FFF" : "#175FA4"}
        >{"History"}</SmallButtonDiv>
    </MyLendsButtonsDiv>
    
};

MyLendsButtons.defaultProps = {
};


export default MyLendsButtons;