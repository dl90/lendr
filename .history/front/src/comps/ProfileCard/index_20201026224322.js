import React from 'react';
import styled, { css } from 'styled-components';

const UserProfileCard = styled.div`
border: 1px solid black;
width: 86%;
height:103px;
border-radius:10px;
`;

const ProfileCard = ({ }) => {
    return <UserProfileCard>
        <userProfile>img</userProfile>
        <userName>Name</userName>
        <userRating></userRating>
    </UserProfileCard>
}


export default ProfileCard;