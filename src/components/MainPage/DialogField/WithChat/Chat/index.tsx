import React from 'react';
import {useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {selectChatDialogState} from '../../../../../redux/chat/dialog/slice';
import {selectChatMessages} from '../../../../../redux/chat/messages/slice';
import dateToString from '../../../../../utils/helpers/dateToString';

import Message from './Message';
import RelativeDate from '../../../../Common/RelativeDate';
import Loader from '../../../../Common/Loader';


const Chat: React.FC<{}> = () => {
	const messages = useSelector(selectChatMessages),
		{isLoading, wasError} = useSelector(selectChatDialogState);

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
				<div className="red">Error in loading</div>
			</div>
		);

	if(!messages.length)
		return (
			<div className={styles.chat}>
				<div className={styles.noMessage}>No messages</div>
			</div>
		);

	let lastDate = dateToString(messages[0].time);

	return (
		<div className={styles.chat}>
			{
				messages.map((message, index) => {
					const isSame = lastDate == dateToString(message.time);
					lastDate = dateToString(message.time);

					return (
						<>
							{!isSame && <RelativeDate time={messages[index - 1].time}/>}
							<Message {...message} key={message._id}/>
						</>
					)
				})
			}

			<RelativeDate time={messages.slice(-1)[0].time}/>
		</div>
	);
};

export default Chat;
