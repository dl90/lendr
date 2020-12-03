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
       
        <Link to={{ pathname: "/specificCategories", state:'Vehicles' }}>
        <CategoryThumbnail src={"/Automobile.png"} text={"Vehicles"}></CategoryThumbnail>
        </Link>
        <Link to={{ pathname: "/specificCategories", state:'Appliances' }}>
        <CategoryThumbnail src={"/Appliances.png"} text={"Appliances"}></CategoryThumbnail>
        </Link>
        <Link to={{ pathname: "/specificCategories", state:'Electronics' }}>
        <CategoryThumbnail src={"/Electronics.png"} text={"Electronics"}></CategoryThumbnail>
        </Link>
        <Link to={{ pathname: "/specificCategories", state:'Vehicles' }}>
        <CategoryThumbnail src={"/Furniture.png"} text={"Furniture"}></CategoryThumbnail>
        </Link>
        <Link to={{ pathname: "/specificCategories", state:'Recreation' }}>
        <CategoryThumbnail src={"/Recreation.png"} text={"Recreation"}></CategoryThumbnail>
        </Link>
        <Link to={{ pathname: "/specificCategories", state:'Sports & Fitness' }}>
        <CategoryThumbnail src={"/Sports&Fitness.png"} text={"Sports & Fitness"}></CategoryThumbnail>
        </Link>
        <Link to={{ pathname: "/specificCategories", state:'Tools' }}>
        <CategoryThumbnail src={"/Tools.png"} text={"Tools"}></CategoryThumbnail>
        </Link>
        <Link to={{ pathname: "/specificCategories", state:'Venues' }}>
        <CategoryThumbnail src={"/Venues.png"} text={"Venues"}></CategoryThumbnail>
        </Link>
    </CategoryGalleryDiv>
};

CategoryGallery.defaultProps = {
};


export default CategoryGallery;
