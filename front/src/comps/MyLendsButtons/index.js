import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { Link } from "react-router-dom";

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

const MyLendsButtons = ({ active }) => {
    const [MyLendsActive, changeMyLendsActive] = useState(active);
    // useEffect(() => {
    //     changeMyLendsActive(active);
    // }, [active])
    return <MyLendsButtonsDiv>
        
        <Link to="/lendingAvailable">
        <SmallButtonDiv 
            onClick={() => {changeMyLendsActive(1) }}
                bgcolor={MyLendsActive === 1 ? "#175FA4" : "#DCEFFB"}
                color={MyLendsActive === 1 ? "#FFF" : "#175FA4"}
        >{"Available"}</SmallButtonDiv>
         </Link>
        <Link to="/lendingLoan">
        <SmallButtonDiv 
            onClick={() => {changeMyLendsActive(2) }}
            bgcolor={MyLendsActive === 2 ? "#175FA4" : "#DCEFFB"}
            color={MyLendsActive === 2 ? "#FFF" : "#175FA4"}
        >{"On Loan"}</SmallButtonDiv>
        </Link>
        <Link to="/lendingHistory">
        <SmallButtonDiv 
            onClick={() => {changeMyLendsActive(3) }}
            bgcolor={MyLendsActive === 3 ? "#175FA4" : "#DCEFFB"}
            color={MyLendsActive === 3 ? "#FFF" : "#175FA4"}
        >{"History"}</SmallButtonDiv>
        </Link>
    </MyLendsButtonsDiv>
    
};

MyLendsButtons.defaultProps = {
};


export default MyLendsButtons;