import React from 'react';
import styled from 'styled-components';

import CategoryButton from '../CategoryButton';

const CategoryButtonsDiv = styled.div`
    display:flex;
    justify-content:space-between;

    max-width:326px;
`;

const CategoryButtons = () => {
    return <CategoryButtonsDiv>
        <CategoryButton src={"/vehicles.svg"} text={"Vehicles"}></CategoryButton>
        <CategoryButton src={"/appliances.svg"} text={"Appliances"}></CategoryButton>
        <CategoryButton src={"/electronics.svg"} text={"Electronics"}></CategoryButton>
        <CategoryButton src={"/furniture.svg"} text={"Furniture"}></CategoryButton>
    </CategoryButtonsDiv>
};

CategoryButtons.defaultProps = {
};


export default CategoryButtons;