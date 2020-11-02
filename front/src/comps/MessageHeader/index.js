import React from 'react';
import styled, { css } from 'styled-components';
import Header from '../Header';

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
    margin-bottom: 10px;
    margin-top: 0px;
    justify-content:center;
`;


// User Info holds the profile image, edit profile, username and user rating
const UserInfo = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    display:flex;
    flex-direction: column;
    justify-content:center;
`;

//UserProfile is the profile image
const UserProfile = styled.div`
    min-height:73px;
    max-width:73px;
    border-radius:1000px;
    overflow: hidden;
    align-items:center;
    justify-content:center;
    display:flex;
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
`;

const UserName = styled.div`
    margin-bottom:-15px;
    text-align:center;
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




const MessageHeader = ({ userImg, userName, }) => {
    return <UserProfileCard>
        <UserInfo>
            {/* <Header /> */}
            <UserImg>
                <UserProfile>
                    <img src={userImg} />
                </UserProfile>
            </UserImg>
            <UserData>
                <UserName><h3>{userName}</h3></UserName>
            </UserData>
        </UserInfo>
    </UserProfileCard>
}


MessageHeader.defaultProps = {
    userImg: '/placeholderProfile.png',
    userName: "Chad Smith",

}


export default MessageHeader;