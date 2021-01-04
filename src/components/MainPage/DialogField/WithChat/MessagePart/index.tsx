import React from 'react';
import {useSelector} from 'react-redux';

import {selectChatDialogState} from '../../../../../redux/chat/dialog/slice';

import MessageType from './Types/MessageType';
import UserType from './Types/UserType';


export const MessagePart: React.FC<{}> = () => {
	const chatDialog = useSelector(selectChatDialogState);

	if(chatDialog.dialog)
		return <MessageType/>;

	if(chatDialog.user)
		return <UserType/>;

	return null;
};

export default MessagePart;
