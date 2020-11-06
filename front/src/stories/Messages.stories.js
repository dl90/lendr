
import AskLender from '../comps/AskLender';
import React from 'react';
import Message from '../comps/Message';
import MessageBar from '../comps/MessageBar';

export default {
    title: 'Inputs/Messages',
    component: Message,
};

export const CustomAskLender = () => <AskLender></AskLender>;

export const CustomMessage = () => <Message></Message>;
export const CustomMessageBar = () => <MessageBar></MessageBar>;