import React from 'react';
import styled from 'styled-components';

const ChatDiv = styled.div`
    width:100%;
    display:flex;
    margin:10px 0px;
`;

const ChatSecondaryBox = styled.div`
    height: auto;
    max-width:200px;
    display:inline-flex;
    padding:15px;
    border-radius:10px;
    margin:1px;

    background-color:#175FA4;
    color:white;
`;

const ChatSecondary = ({message}) => {
    return <ChatDiv>
        <ChatSecondaryBox>
            {message}
        </ChatSecondaryBox>
    </ChatDiv>
};

ChatSecondary.defaultProps = {
    message: "Hey, this is Alex! Is your bike still in good condition? I'd like to rent it."
};


export default ChatSecondary;