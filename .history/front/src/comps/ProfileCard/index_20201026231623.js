import React from 'react';
import styled, { css } from 'styled-components';


const UserProfileCard = styled.div`

// width: 86%;
width:345px;
height:103px;
border-radius:10px;
display:flex;
align-items:center;
box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.10);

`;

const UserInfo = styled.div`
display:flex;
align-items:center;
justify-content:center;
margin-left:9.6%;
`;

const UserProfile = styled.div`
border: 1px solid black;
height:73px;
width:73px;
border-radius:100%;
overflow: hidden;
display:flex;
align-items:center;
justify-content:center;
margin-right:13px;
`;

const UserData = styled.div`
margin-top:30px;
`;
const UserName = styled.div``;
const UserRating = styled.div``;



const ProfileCard = ({ img, userName, userRating }) => {
    return <UserProfileCard>
        <UserInfo>
            <UserProfile>
                <img src={img} />
            </UserProfile>
            <UserData>
                <UserName>{userName}</UserName>
                <UserRating>{userRating}</UserRating>
            </UserData>
        </UserInfo>
    </UserProfileCard>
}

ProfileCard.defaultProps = {
    img: 'url("./placeholderProfile.png")',
    userName: "Chad",
    userRating: null,
}


export default ProfileCard;