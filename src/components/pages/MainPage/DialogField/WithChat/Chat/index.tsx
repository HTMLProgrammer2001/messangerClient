import React, {useRef} from 'react';
import {useSelector} from 'react-redux';

import styles from './styles.module.scss';

import {selectChatDialogState} from '../../../../../../redux/chat/dialog/slice';
import {selectChatMessages} from '../../../../../../redux/chat/messages/slice';

import Loader from '../../../../../Common/Loader';
import Messages from './Messages';
import {selectSendMessagesForDialog} from '../../../../../../redux/sendMessage/slice';


const Chat: React.FC<{}> = () => {
	const messages = useSelector(selectChatMessages),
		{isLoading, wasError, dialog} = useSelector(selectChatDialogState),
		loadingMessages = useSelector(selectSendMessagesForDialog(dialog));

	if(isLoading)
		return (
			<div className={styles.chat}>
				<div className={styles.noMessage} style={{color: 'black'}}>
					<Loader/>
				</div>
			</div>
		);

	if(wasError)
		return (
			<div className={styles.chat}>
				<div className={`red ${styles.noMessage}`}>Error in loading</div>
			</div>
		);

	if(!messages.length && !loadingMessages.length)
		return (
			<div className={styles.chat}>
				<div className={styles.noMessage}>No messages</div>
			</div>
		);

	return <Messages/>;
};

export default Chat;
