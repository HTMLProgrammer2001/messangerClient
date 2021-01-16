import React from 'react';
import {useSelector} from 'react-redux';

import {selectChatDialogState, selectChatDialog} from '../../../../../redux/chat/dialog/slice';

import MessageType from './Types/MessageType';
import UserType from './Types/UserType';
import BannedType from './Types/BannedType';
import {selectChatSelectedCount} from '../../../../../redux/chat/selected';
import SelectType from './Types/SelectType';


export const MessagePart: React.FC<{}> = () => {
	const chatDialogState = useSelector(selectChatDialogState),
		chatDialog = useSelector(selectChatDialog),
		count = useSelector(selectChatSelectedCount);

	if(count && chatDialog?.isActive)
		return <SelectType/>;

	if(chatDialog?.isActive)
		return <MessageType/>;

	if(chatDialog)
		return <BannedType/>;

	if(chatDialogState.user)
		return <UserType/>;

	return null;
};

export default MessagePart;
