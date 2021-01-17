import React from 'react';
import {v4 as uuid} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';

import styles from '../styles.module.scss';
import {ISendMessage} from '../../../../../../redux/sendMessage/slice';
import {MessageTypes} from '../../../../../../constants/MessageTypes';

import {chatEditClear, selectChatEditMessage, chatEditStart} from '../../../../../../redux/chat/edit/slice';
import {selectMeInfo} from '../../../../../../redux/me/slice';
import {selectChatDialog} from '../../../../../../redux/chat/dialog/slice';

import UserAvatar from '../../../../../Common/UserAvatar';
import MessageInput from '../MessageInput';
import EditedMessage from '../../../../../Common/EditedMessage';


const EditType: React.FC = () => {
	//get data from store
	const message = useSelector(selectChatEditMessage),
		user = useSelector(selectMeInfo),
		dialog = useSelector(selectChatDialog);

	const dispatch = useDispatch();

	const cancelHandler = () => dispatch(chatEditClear()),
		onSubmit = (data: ISendMessage) => {
			//send message
			dispatch(chatEditStart({
				message: {
					...data, author: user, dialog,
					_id: uuid(), time: +(new Date())
				},
				id: message._id
			}));
		};

	return (
		<div>
			<EditedMessage message={message} cancel={cancelHandler}/>

			<div className={styles.message_row}>
				<UserAvatar
					avatar={user.avatar}
					name={user.name}
				/>

				<MessageInput
					onSubmit={onSubmit}
					defaultMessage={message.type == MessageTypes.MESSAGE ? message.message : ''}
				/>
			</div>
		</div>
	);
};

export default EditType;
