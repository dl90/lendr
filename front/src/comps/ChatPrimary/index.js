import React from 'react';
import styled from 'styled-components';

const ChatDiv = styled.div`
    width:100%;
    display:flex;
    justify-content:flex-end;
    margin:10px 0px;
`;

const ChatPrimaryDiv = styled.div`
    height: auto;
    max-width:200px;
    display:inline-flex;
    padding:15px;
    border-radius:10px;
    margin:1px;

    background-color:#39A6DC;
    color:white;
`;

const ChatPrimary = ({message}) => {
    return <ChatDiv>
        <ChatPrimaryDiv>
            {message}
        </ChatPrimaryDiv>
    </ChatDiv>
};

ChatPrimary.defaultProps = {
    message: "Hey Alex, it's a pretty new. I haven't used it much."
};


export default ChatPrimary;