import React from 'react';
import {useSelector} from 'react-redux';

import styles from './styles.module.scss';
import {selectChatDialogState} from '../../../../../redux/chat/dialog/slice';
import dateToString from '../../../../../utils/helpers/dateToString';

import Message from './Message';
import RelativeDate from '../../../../Common/RelativeDate';
import Loader from '../../../../Common/Loader';


const Chat: React.FC<{}> = () => {
	const messages = [],
		{isLoading, wasError, dialog} = useSelector(selectChatDialogState);

	if(isLoading)
		return (
			<div className={styles.chat}>
				<Loader/>
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
			<RelativeDate time={messages[0].time}/>

			{
				messages.map((message) => {
					const isSame = lastDate == dateToString(message.time);
					lastDate = dateToString(message.time);

					return (
						<>
							{!isSame && <RelativeDate time={message.time}/>}
							<Message {...message} key={message._id}/>
						</>
					)
				})
			}
		</div>
	);
};

export default Chat;
