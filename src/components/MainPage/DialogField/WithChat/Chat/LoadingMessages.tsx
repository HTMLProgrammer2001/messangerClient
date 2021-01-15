import React from 'react';
import {useSelector} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {selectSendMessagesForDialog} from '../../../../../redux/sendMessage/slice';
import {selectChatDialogState} from '../../../../../redux/chat/dialog/slice';
import Message from '../../../../Common/Message';


const LoadingMessages = () => {
	const {dialog} = useSelector(selectChatDialogState),
		loadingMessages = useSelector(selectSendMessagesForDialog(dialog));

	loadingMessages.reverse();

	if(!loadingMessages)
		return;

	return (
		<>
			{
				loadingMessages.map(msg => (
					<div className={cn(styles.chat_message, 'fa', {
						[styles.loading]: true
					})}>
						<Message
							message={msg.msg}
							key={msg.msg._id}
							isLoading={true}
							progress={msg.progress}
						/>
					</div>
				))
			}
		</>
	);
};

export default LoadingMessages;
