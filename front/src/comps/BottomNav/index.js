import React, { useState } from 'react';
import styled from 'styled-components';

const NavBar = styled.div`
    max-width:414px;
    min-height:76px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
    display:flex;
    align-items: center;
    justify-content: space-evenly;
    div{
        text-align:center;
        align-items: center;
        background-color:white;
        justify-content: center;
        user-select:none;
    }
    background-color:white;
`;

const Explore = styled.div`
    color:${props => props.exploreActive};
    cursor:pointer;
`;

const Lend = styled.div`
    color:${props => props.lendActive};
    cursor:pointer;
`;

const Post = styled.div`
color:${props => props.postActive};
cursor:pointer;
`;

const Chat = styled.div`
color:${props => props.chatActive};
cursor:pointer;
`;

const More = styled.div`
color:${props => props.settingsActive};
cursor:pointer;
`;

const BottomNav = ({ }) => {
    const [exploreActiveValue, changeExploreActive] = useState(1);


    //dw it's mostly svg
    //when a user clicks on an icon it defines "changeExploreActive" to 1-5
    //Depending on the value of exploreActiveValue the svg changes color

    return <NavBar>
        <Explore onClick={() => {
            changeExploreActive(1)
        }} exploreActive={exploreActiveValue === 1 ? "orange" : "black"}>
            <div>
                <svg id="exploreIcon" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M1 3.6C1 2.16406 2.16406 1 3.6 1H18.6766C20.1126 1 21.2766 2.16406 21.2766 3.6V18.6766C21.2766 20.1125 20.1126 21.2766 18.6766 21.2766H3.6C2.16406 21.2766 1 20.1125 1 18.6766V3.6Z" stroke={exploreActiveValue === 1 ? "orange" : "black"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M1 7.75885H21.2766" stroke={exploreActiveValue === 1 ? "orange" : "black"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M7.75879 21.2766V7.75885" stroke={exploreActiveValue === 1 ? "orange" : "black"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div>Home</div>
        </Explore>
        <Lend onClick={() => {
            changeExploreActive(2)
        }}
            lendActive={exploreActiveValue === 2 ? "orange" : "black"}>
            <svg id="lendIcon" width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.4655 22V19.7795C19.4655 17.3269 17.432 15.3386 14.9236 15.3386H5.83975C3.33133 15.3386 1.29785 17.3269 1.29785 19.7795V22" stroke={exploreActiveValue === 2 ? "orange" : "black"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3817 10.8976C12.8902 10.8976 14.9237 8.90928 14.9237 6.4566C14.9237 4.00392 12.8902 2.01562 10.3817 2.01562C7.87332 2.01562 5.83984 4.00392 5.83984 6.4566C5.83984 8.90928 7.87332 10.8976 10.3817 10.8976Z" stroke={exploreActiveValue === 2 ? "orange" : "black"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M26.2782 22V19.7795C26.2767 17.7557 24.8759 15.9889 22.8718 15.4829" stroke={exploreActiveValue === 2 ? "orange" : "black"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M18.3301 2.15997C20.3398 2.6631 21.7454 4.43374 21.7454 6.46216C21.7454 8.49059 20.3398 10.2612 18.3301 10.7644" stroke={exploreActiveValue === 2 ? "orange" : "black"} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div>Lend</div>
        </Lend>
        <Post onClick={() => {
            changeExploreActive(3)
        }}
            postActive={exploreActiveValue === 3 ? "orange" : "black"}>
            <svg id="postIcon" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.875 13.125H13.125V22.875H9.875V13.125H0.125V9.875H9.875V0.125H13.125V9.875H22.875V13.125Z" fill={exploreActiveValue === 3 ? "orange" : "black"} />
            </svg>
            <div>Post</div>
        </Post>
        <Chat onClick={() => {
            changeExploreActive(4)
        }}

            chatActive={exploreActiveValue === 4 ? "orange" : "black"}>
            <svg id="chatIcon" width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.2354 12.6975H18.6647L16.1412 16.5133H11.0941L8.57061 12.6975H1" stroke={exploreActiveValue === 4 ? "orange" : "black"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.37833 2.76361L1 12.6975V19.0572C1 20.4622 2.12983 21.6011 3.52354 21.6011H23.7118C25.1055 21.6011 26.2354 20.4622 26.2354 19.0572V12.6975L21.857 2.76361C21.4524 1.84281 20.547 1.24931 19.548 1.25H7.68737C6.68833 1.24931 5.78294 1.84281 5.37833 2.76361Z" stroke={exploreActiveValue === 4 ? "orange" : "black"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div>Chat</div>
        </Chat>
        <More onClick={() => {
            changeExploreActive(5)
        }}

            settingsActive={exploreActiveValue === 5 ? "orange" : "black"}>
            <svg id="settingsIcon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.7846 7.16473C9.92998 7.16473 7.66089 9.43382 7.66089 12.2885C7.66089 15.1431 9.92998 17.4122 12.7846 17.4122C15.6393 17.4122 17.9084 15.1431 17.9084 12.2885C17.9084 9.43382 15.6393 7.16473 12.7846 7.16473ZM12.7846 15.9483C10.7351 15.9483 9.12482 14.338 9.12482 12.2885C9.12482 10.239 10.7351 8.62866 12.7846 8.62866C14.8341 8.62866 16.4445 10.239 16.4445 12.2885C16.4445 14.338 14.8341 15.9483 12.7846 15.9483Z" fill={exploreActiveValue === 5 ? "orange" : "black"} stroke={exploreActiveValue === 5 ? "orange" : "black"} stroke-width="0.2" />
                <path d="M23.5445 9.87309L21.495 9.21433L21.0558 8.11638L22.0806 6.21327C22.3002 5.77409 22.227 5.18852 21.861 4.82254L20.1043 3.06583C19.7383 2.69984 19.1527 2.62665 18.7135 2.84624L16.8104 3.87099L15.7125 3.43181L15.0537 1.38231C14.9073 0.94313 14.4681 0.577148 13.9558 0.577148H11.4671C10.9547 0.577148 10.5155 0.943131 10.4423 1.45551L9.78357 3.505C9.34439 3.5782 8.97841 3.72459 8.61243 3.94418L6.70932 2.91943C6.27014 2.69984 5.68457 2.77304 5.31859 3.13902L3.56187 4.89574C3.19589 5.26172 3.1227 5.84729 3.34229 6.28647L4.29384 8.11638C4.14745 8.48236 4.00105 8.92154 3.85466 9.28752L1.80516 9.94629C1.36598 10.0927 1 10.5319 1 11.0442V13.5329C1 14.0453 1.36598 14.4845 1.87836 14.6309L3.92786 15.2896L4.36703 16.3876L3.34229 18.2907C3.1227 18.7299 3.19589 19.3154 3.56187 19.6814L5.31859 21.4381C5.68457 21.8041 6.27014 21.8773 6.70932 21.6577L8.61243 20.633L9.71037 21.0721L10.3691 23.1948C10.5155 23.634 10.9547 24 11.4671 24H13.9558C14.4681 24 14.9073 23.634 15.0537 23.1948L15.7125 21.0721L16.8104 20.633L18.7135 21.6577C19.1527 21.8773 19.7383 21.8041 20.1043 21.4381L21.861 19.6814C22.227 19.3154 22.3002 18.7299 22.0806 18.2907L21.0558 16.3876L21.495 15.2896L23.6177 14.6309C24.0569 14.4845 24.4229 14.0453 24.4229 13.5329V11.0442C24.4229 10.5319 24.0569 10.0195 23.5445 9.87309V9.87309ZM22.9589 13.3133L20.3239 14.1185L20.2507 14.4845L19.5919 16.0216L19.3723 16.3876L20.6898 18.8031L19.2259 20.267L16.8104 18.9494L16.4444 19.169C15.9321 19.4618 15.4197 19.6814 14.9073 19.8278L14.5413 19.901L13.7362 22.5361H11.6867L10.8815 19.901L10.5155 19.8278L8.97841 19.169L8.61243 18.9494L6.19695 20.267L4.73302 18.8031L6.05055 16.3876L5.83096 16.0216C5.53818 15.5092 5.31859 14.9968 5.1722 14.4845L5.099 14.1185L2.46393 13.3133V11.2638L4.95261 10.5319L5.099 10.1659C5.24539 9.58031 5.46498 9.06793 5.75777 8.55556L5.97736 8.18957L4.73302 5.77409L6.19695 4.31017L8.53923 5.6277L8.90521 5.40811C9.41759 5.11533 9.92996 4.89574 10.5155 4.74934L10.8815 4.60295L11.6867 2.04108H13.7362L14.5413 4.60295L14.9073 4.74934C15.4197 4.89574 15.9321 5.11533 16.4444 5.40811L16.8104 5.6277L19.2259 4.31017L20.6898 5.77409L19.3723 8.18957L19.5919 8.55556C19.8847 9.06793 20.1043 9.58031 20.2507 10.0927L20.3239 10.4587L22.9589 11.2638V13.3133V13.3133Z" fill={exploreActiveValue === 5 ? "orange" : "black"} stroke={exploreActiveValue === 5 ? "orange" : "black"} stroke-width="0.2" />
            </svg>
            <div>More</div>
        </More>

    </NavBar>
};

BottomNav.defaultProps = {
    exploreActive: "black",
    lendActive: "black",
    postActive: "black",
    chatActive: "black",
    settingsActive: "black",
};


export default BottomNav;