import React from 'react';
import styled from 'styled-components';

import CategoryThumbnail from '../CategoryThumbnail';

const CategoryGalleryDiv = styled.div`
    display:flex;
    flex-wrap:wrap;
    width:322.4px;

    justify-content:space-between;
    align-items:space-between;

`;

const CategoryGallery = () => {
    return <CategoryGalleryDiv>
        <CategoryThumbnail src={"/Automobile.png"} text={"Automobile"}></CategoryThumbnail>
        <CategoryThumbnail src={"/Appliances.png"} text={"Appliances"}></CategoryThumbnail>
        <CategoryThumbnail src={"/Electronics.png"} text={"Electronics"}></CategoryThumbnail>
        <CategoryThumbnail src={"/Furniture.png"} text={"Furniture"}></CategoryThumbnail>
        <CategoryThumbnail src={"/Recreation.png"} text={"Recreation"}></CategoryThumbnail>
        <CategoryThumbnail src={"/Sports&Fitness.png"} text={"Sports & Fitness"}></CategoryThumbnail>
        <CategoryThumbnail src={"/Tools.png"} text={"Tools"}></CategoryThumbnail>
        <CategoryThumbnail src={"/Venues.png"} text={"Venues"}></CategoryThumbnail>
    </CategoryGalleryDiv>
};

CategoryGallery.defaultProps = {
};


export default CategoryGallery;
