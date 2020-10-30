import React from 'react';
import ProfileCard from '../comps/ProfileCard';

export default {
    title: 'Profile Card',
    component: ProfileCard,
};

//userState adds Edit Profile and is used for when a user is looking at their own profile
//msgState adds the message button on the bottom and is used when looking at a users profile
// a card with no props is used on the item page
//userImg is the prop that changes the profile picture

export const UserProfileCard = () => <ProfileCard userState={true} />
export const RenterProfileCard = () => <ProfileCard />
export const RenterProfileProfileCard = () => <ProfileCard msgState={true} />
