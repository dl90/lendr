import React from 'react';
import styled from 'styled-components';

import CategoryThumbnail from '../CategoryThumbnail';

import {Link} from "react-router-dom";

const CategoryGalleryDiv = styled.div`
    display:flex;
    flex-wrap:wrap;
    width:322.4px;

    justify-content:space-between;
    align-items:space-between;

`;

const CategoryGallery = () => {
    return <CategoryGalleryDiv>
       
        <Link to="/specificCategories">
        <CategoryThumbnail src={"/Automobile.png"} text={"Automobile"}></CategoryThumbnail>
        </Link>
        <Link to="/specificCategories">
        <CategoryThumbnail src={"/Appliances.png"} text={"Appliances"}></CategoryThumbnail>
        </Link>
        <Link to="/specificCategories">
        <CategoryThumbnail src={"/Electronics.png"} text={"Electronics"}></CategoryThumbnail>
        </Link>
        <Link to="/specificCategories">
        <CategoryThumbnail src={"/Furniture.png"} text={"Furniture"}></CategoryThumbnail>
        </Link>
        <Link to="/specificCategories">
        <CategoryThumbnail src={"/Recreation.png"} text={"Recreation"}></CategoryThumbnail>
        </Link>
        <Link to="/specificCategories">
        <CategoryThumbnail src={"/Sports&Fitness.png"} text={"Sports & Fitness"}></CategoryThumbnail>
        </Link>
        <Link to="/specificCategories">
        <CategoryThumbnail src={"/Tools.png"} text={"Tools"}></CategoryThumbnail>
        </Link>
        <Link to="/specificCategories">
        <CategoryThumbnail src={"/Venues.png"} text={"Venues"}></CategoryThumbnail>
        </Link>
    </CategoryGalleryDiv>
};

CategoryGallery.defaultProps = {
};


export default CategoryGallery;
