import React from 'react';
import CategoryButtons from '../comps/CategoryButtons';
import CategoryThumbnail from '../comps/CategoryThumbnail';
import CategoryGallery from '../comps/CategoryGallery';

export default {
    title: 'Categories/Thumbnails+Buttons',
    component: CategoryThumbnail
};

export const AllCategoryButtons = () =><CategoryButtons></CategoryButtons>
export const LenderCategoryThumbnail = () => <CategoryThumbnail src={"/defaultCategory.jpg"}></CategoryThumbnail>;
export const FullCategoryGallery = () => <CategoryGallery></CategoryGallery>