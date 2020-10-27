import React from 'react';
import styled, { css } from 'styled-components';

const UserProfileCard = styled.div`
border: 1px solid black;
width: 86%;
height:103px;
border-radius:10px;
display:flex;
align-items:center;
justify-content:center
`;

const ProfileCard = ({ }) => {
    return <UserProfileCard>
        <userProfile>img</userProfile>
        <userName>Name</userName>
        <userRating>Stars</userRating>
    </UserProfileCard>
}


export default ProfileCard;