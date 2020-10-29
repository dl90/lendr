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

const settingsIcon = styled.img`
`;

const BottomNav = ({ }) => {
    return <NavBar>
        <div>
            <div><img alt="Explore" src="./exploreIcon.svg" /></div>
            <div>Home</div>
        </div>
        <div>
            <div><img alt="lend" src="./lendIcon.svg" /></div>
            <div>Lend</div>
        </div>        <div>
            <div><img alt="post" src="./postIcon.svg" /></div>
            <div>Post</div>
        </div>        <div>
            <div><img alt="chat" src="./chatIcon.svg" /></div>
            <div>Chat</div>
        </div>        <div>
            <div><img alt="settings" src="./settingsIcon.svg" /></div>
            <div>More</div>
        </div>

    </NavBar>
};

BottomNav.defaultProps = {

};


export default BottomNav;