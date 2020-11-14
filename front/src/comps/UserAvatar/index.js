import React from 'react';
import styled from 'styled-components';

const UserAvatarDiv = styled.div`
height:60px;
max-width: 60px;
border-radius:50%;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
 img {
     width:100%;
     height:100%;
 }
`;

const UserAvatar = () => {
    return <UserAvatar>
        <img src="/placeholderProfile.png"></img>
    </UserAvatar>
};

UserAvatar.defaultProps = {
};


export default UserAvatar;