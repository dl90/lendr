import React from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
    max-width:375px;
    min-height:76px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
    display:flex;
    align-items: center;
    justify-content: space-evenly;
    div{
        text-align:center;
        align-items: center;
    justify-content: center;

    }
`;

const Explore = styled.div`

`;

const Lend = styled.div`

`;

const Post = styled.div`

`;

const Chat = styled.div`

`;

const More = styled.div`
`;

const BottomNav = ({ }) => {
    return <NavBar>
        <Explore>
            <div><img alt="Explore" src="./exploreIcon.svg" /></div>
            <div>Home</div>
        </Explore>
        <Lend>
            <div><img alt="lend" src="./lendIcon.svg" /></div>
            <div>Lend</div>
        </Lend>
        <Post>
            <div><img alt="post" src="./postIcon.svg" /></div>
            <div>Post</div>
        </Post>
        <Chat>
            <div><img alt="chat" src="./chatIcon.svg" /></div>
            <div>Chat</div>
        </Chat>
        <More>
            <div><img alt="settings" src="./settingsIcon.svg" /></div>
            <div>More</div>
        </More>

    </NavBar>
};

BottomNav.defaultProps = {

};


export default BottomNav;