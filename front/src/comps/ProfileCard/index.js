import React from 'react';
import styled, { css } from 'styled-components';


const UserProfileCard = styled.div`

// width: 86%;
width:345px;
height:120px;
border-radius:10px;
display:flex;
align-items:center;
box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.10);
background-color:white;

`;

const UserInfo = styled.div`
display:flex;
align-items:center;
justify-content:center;
margin-left:9.6%;
display:flex;
flex-direction: row;

`;

const UserProfile = styled.div`

height:73px;
width:73px;
border-radius:100%;
overflow: hidden;
display:flex;
align-items:center;
justify-content:center;
margin-right:25px;
img{
   width:100%;
   height:100%
}
`;

const UserImg = styled.div`
p{
    margin-top:05px;
}
`;

const UserData = styled.div`
margin-top:30px;
`;
const UserName = styled.div``;
const UserRating = styled.div``;



const ProfileCard = ({ img, userName, userRating }) => {
    return <UserProfileCard>
        <UserInfo>
            <UserImg>
                <UserProfile>
                    <img src={img} />
                </UserProfile>
                <a>Edit Profile</a>
            </UserImg>
            <UserData>
                <UserName>{userName}</UserName>
                <UserRating>
                    <img src={userRating} />
                    <img src={userRating} />
                    <img src={userRating} />
                    <img src={userRating} />
                    <img src={userRating} />
                </UserRating>
            </UserData>
        </UserInfo>
    </UserProfileCard>
}

ProfileCard.defaultProps = {
    img: './placeholderProfile.png',
    userName: "Chad Smith",
    userRating: './activeStar.png',
}


export default ProfileCard;