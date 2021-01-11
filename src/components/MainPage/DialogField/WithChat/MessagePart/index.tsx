import React from 'react';
import {useSelector} from 'react-redux';

import {selectChatDialogState, selectChatDialog} from '../../../../../redux/chat/dialog/slice';

import MessageType from './Types/MessageType';
import UserType from './Types/UserType';
import BannedType from './Types/BannedType';


export const MessagePart: React.FC<{}> = () => {
	const chatDialogState = useSelector(selectChatDialogState),
		chatDialog = useSelector(selectChatDialog);

	if(chatDialog?.isActive)
		return <MessageType/>;

	if(chatDialog)
		return <BannedType/>;

	if(chatDialogState.user)
		return <UserType/>;

	return null;
};

export default MessagePart;
