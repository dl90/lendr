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

const UserInfo = styled.div`
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
const UserName = styled.div``;
const UserRating = styled.div``;


const ProfileCard = ({ }) => {
    return <UserProfileCard>
        <UserInfo>
            <UserProfile>img</UserProfile>
            <UserName>Name</UserName>
            <UserRating>Stars</UserRating>
        </UserInfo>
    </UserProfileCard>
}


export default ProfileCard;