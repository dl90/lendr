
import AskLender from '../comps/AskLender';
import React from 'react';
import Message from '../comps/Message';
import MessageBar from '../comps/MessageBar';

import ChatPrimary from '../comps/ChatPrimary';
import ChatSecondary from '../comps/ChatSecondary';

export default {
    title: 'Inputs/Messages',
    component: Message,
};

export const CustomAskLender = () => <AskLender></AskLender>;

export const CustomMessage = () => <Message></Message>;
export const CustomMessageBar = () => <MessageBar></MessageBar>;

export const SampleChatPrimary = () => <ChatPrimary></ChatPrimary>
export const SampleChatSecondary = () => <ChatSecondary></ChatSecondary>