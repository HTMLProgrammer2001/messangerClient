import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {MessageTypes} from '../../../../../constants/MessageTypes';
import {selectChatMessages, selectChatMessagesState, chatMessagesStart} from '../../../../../redux/chat/messages/slice';
import dateToString from '../../../../../utils/helpers/dateToString';

import RelativeDate from '../../../../Common/RelativeDate';
import Message from '../../../../Common/Message';
import Loader from '../../../../Common/Loader';


const Messages: React.FC = () => {
	const messages = useSelector(selectChatMessages),
		{isLoading, error, offset, totalPages} = useSelector(selectChatMessagesState),
		dispatch = useDispatch();

	const chat = useRef<HTMLDivElement>(null);

	const scrollHandler = () => {
		if(!chat.current || isLoading)
			return;

		//calculate left scroll
		const left = chat.current.scrollTop + chat.current.scrollHeight - chat.current.clientHeight;

		//get data from store
		if(left < 100 && offset < totalPages)
			dispatch(chatMessagesStart());
	};

	let lastDate = dateToString(messages[0].time);

	return (
		<div className={styles.chat} onScroll={scrollHandler} ref={chat}>
			{
				messages.map((message, index) => {
					const isSame = lastDate == dateToString(message.time);
					lastDate = dateToString(message.time);

					return (
						<>
							{!isSame && <RelativeDate time={messages[index - 1].time}/>}

							<div className={cn(styles.chat_message, 'fa', {
								[styles.noHover]: message.type == MessageTypes.SPECIAL
							})}>
								<Message message={message} key={message._id}/>
							</div>
						</>
					)
				})
			}

			<RelativeDate time={messages.slice(-1)[0].time}/>

			{isLoading && <Loader/>}
		</div>
	);
};

export default Messages;
