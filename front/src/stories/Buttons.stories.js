import React from 'react';
import SmallButton from '../comps/SmallButton';
import Button from '../comps/Button';
import CategoryButtons from '../comps/CategoryButtons';
import MyLendsButtons from '../comps/MyLendsButtons';
import Like from '../comps/Like';

export default {
    title: 'Buttons/Lendr Buttons',
    component: SmallButton
};

export const ActiveSmallButton = () => <SmallButton bgcolor={"#175FA4"} color={"#FFF"} text={"Button"}></SmallButton>;
export const InactiveSmallButton = () => <SmallButton bgcolor={"#DCEFFB"} color={"#175FA4"} text={"Button"}></SmallButton>;

export const LoginButton = () => <Button bg={"linear-gradient(119.69deg, rgba(57, 166, 220, 0.75) -15.26%, #39A6DC 98.97%)"} text={"Login"}></Button>;
export const SignupButton = () => <Button bg={"linear-gradient(119.69deg, rgba(255, 138, 0, 0.5) -15.26%, #FF8A00 98.97%)"} text={"Sign up"}></Button>;

export const AllCategoryButtons = () =><CategoryButtons></CategoryButtons>

export const DefaultMyLendsButtons = () => <MyLendsButtons></MyLendsButtons>

export const LikeButton = () => <Like></Like>