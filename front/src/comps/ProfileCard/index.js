import React from 'react';
import styled, { css } from 'styled-components';
import Button from '../Button';

import { Link } from "react-router-dom";

// To display 'Edit Profile' make sure to write 'userState={true}' when stating the comp.
// the props for this comp are: 'userImg', 'userName', and 'userRating'
// **** The User Rating still needs to be implemented ****


//div for the entire card
const UserProfileCard = styled.div`
    max-width:345px;
    min-height:120px;
    border-radius:10px;
    display:flex;
    align-items:center;
    box-shadow: 0px 16px 24px 0px rgba(0, 0, 0, 0.10);
    background-color:white;
    flex-wrap: wrap;
    ${(props) => props.msgState === true && css`
        padding-top:24px;
    `}
`;


// User Info holds the profile image, edit profile, username and user rating
const UserInfo = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    margin-left:9.6%;
    display:flex;
    flex-direction: row;
    padding-top:15px;
`;

//UserProfile is the profile image
const UserProfile = styled.div`
    min-height:73px;
    max-width:73px;
    border-radius:1000px;
    overflow: hidden;
    display:flex;
    align-items:center;
    justify-content:center;
    margin-right:14px;
    img{
        width:100%;
        height:100%
    }
`;

//this is the actual image
const UserImg = styled.div`
    a{
        display:none;
        margin-top:05px;
    }
    ${(props) => props.userState === true && css`
        a{
            display:contents;
        }
    `}
`;

//UserData holds the ratings and the username
const UserData = styled.div`
margin-bottom:50px;
margin-left:10px;
`;

const UserName = styled.div`
    margin-bottom:-15px;

`;

const UserRating = styled.div`
`;


const Message = styled.div`
    display:none;
    ${(props) => props.msgState === true && css`
        display:block;
        width:100%;
        margin-top:35px;
        text-align: -webkit-center;
        margin-bottom: 11px;
`}
`;


const ProfileCard = ({ userImg, userName, userRating, msgState, userState }) => {
    return <UserProfileCard msgState={msgState}>
        <UserInfo>
            <UserImg userState={userState}>
                <UserProfile>
                    <img src={userImg} alt="User Profile" />
                </UserProfile>
                <Link to="/profileSettings"><p>Edit Profile</p></Link>
            </UserImg>
            <UserData>
                <UserName><h2>{userName}</h2></UserName>
                <UserRating>
                    {/* This is hard coded in */}
                    {/* <img src={userRating} alt="Rating1" />
                    <img src={userRating} alt="Rating2" />
                    <img src={userRating} alt="Rating3" />
                    <img src={userRating} alt="Rating4" />
                    <img src={userRating} alt="Rating5" /> */}
                </UserRating>
            </UserData>
        </UserInfo>


        <Message msgState={msgState}>
            <Button text={"Message"} />
        </Message>
    </UserProfileCard>
}


ProfileCard.defaultProps = {
    userImg: '/placeholderProfile.png',
    userName: "Chad Smith",
    userRating: '/activeStar.png',

}



export default ProfileCard;