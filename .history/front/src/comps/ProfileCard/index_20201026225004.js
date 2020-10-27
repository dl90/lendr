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

const UserProfile = styled.div`
border: 1px solid black;
height:73px;
width:73px;
border-radius:100%;
overflow: hidden;
display:flex;
align-items:center;
justify-content:center
`;


const ProfileCard = ({ }) => {
    return <UserProfileCard>
        <Inners>
            <UserProfile>img</UserProfile>
            <userName>Name</userName>
            <userRating>Stars</userRating>
        </Inners>
    </UserProfileCard>
}


export default ProfileCard;