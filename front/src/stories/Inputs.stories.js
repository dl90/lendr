import Input from '../comps/Input';
import CatagoriesDropdown from '../comps/CatagoriesDropdown';
import SearchBar from '../comps/SearchBar';

export default {
    title: 'Inputs/Form and Inputs',
    component: Input,
};

export const TextInput = () => <Input/>
export const CustomCatagoriesDropdown = () => <CatagoriesDropdown></CatagoriesDropdown>;
export const CustomSearchBar = () => <SearchBar></SearchBar>;