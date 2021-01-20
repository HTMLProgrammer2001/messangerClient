import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuid} from 'uuid';

import styles from '../styles.module.scss';
import {selectMeInfo} from '../../../../../../../redux/me/slice';
import {selectChatDialog} from '../../../../../../../redux/chat/dialog/slice';
import {sendMessageStart} from '../../../../../../../redux/sendMessage/slice';

import UserAvatar from '../../../../../../Common/UserAvatar';
import MessageInput from '../MessageInput';
import {MessageTypes} from '../../../../../../../constants/MessageTypes';


const MessageType: React.FC<{}> = () => {
	const user = useSelector(selectMeInfo),
		dialog = useSelector(selectChatDialog);

	const dispatch = useDispatch(),
		onSubmit = (data: {type: MessageTypes, message: string, url?: string}) => {
			//send message
			dispatch(sendMessageStart({
				...data, author: user, dialog,
				_id: uuid(), time: +(new Date())
			}));
		};

	return (
		<div className={styles.message_row}>
			<UserAvatar
				avatar={user.avatar}
				name={user.name}
			/>

			<MessageInput onSubmit={onSubmit}/>
		</div>
	);
};

export default MessageType;
