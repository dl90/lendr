import React from 'react';
import MessageHeader from '../comps/MessageHeader';
import ProfileCard from '../comps/ProfileCard';

export default {
    title: 'Navigation/Profile Card',
    component: MessageHeader,
};

export const MessageHeaderCard = () => <MessageHeader userState={true} />