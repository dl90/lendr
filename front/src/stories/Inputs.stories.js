import Input from '../comps/Input';
import CatagoriesDropdown from '../comps/CatagoriesDropdown';
import SearchBar from '../comps/SearchBar';
import InputParagraph from '../comps/InputParagraph';
import React from 'react';

export default {
    title: 'Inputs/Form and Inputs',
    component: Input,
};

export const TextInput = () => <Input/>
export const Description = () => <InputParagraph title={"Description"} placeholder="Write a description of the item you're renting out."></InputParagraph>
export const CustomCatagoriesDropdown = () => <CatagoriesDropdown></CatagoriesDropdown>;
export const CustomSearchBar = () => <SearchBar></SearchBar>;