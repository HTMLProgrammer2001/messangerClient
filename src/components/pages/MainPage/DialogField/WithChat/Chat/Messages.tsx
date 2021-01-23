import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import styles from './styles.module.scss';
import {MessageTypes} from '../../../../../../constants/MessageTypes';
import {selectChatMessages, selectChatMessagesState, chatMessagesStart} from '../../../../../../redux/chat/messages/slice';
import {selectChatSelectedState, chatSelectedToggle} from '../../../../../../redux/chat/selected';
import dateToString from '../../../../../../utils/helpers/dateToString';

import RelativeDate from '../../../../../Common/RelativeDate';
import Message from '../../../../../Common/Message';
import Loader from '../../../../../Common/Loader';
import LoadingMessages from './LoadingMessages';


const Messages: React.FC = () => {
	//get data from store
	const messages = useSelector(selectChatMessages),
		{isLoading, offset, totalPages} = useSelector(selectChatMessagesState),
		selected = useSelector(selectChatSelectedState),
		dispatch = useDispatch();

	//refs
	const chat = useRef<HTMLDivElement>(null),
		loadIndicator = useRef<HTMLSpanElement>(null);

	//init intersection observer
	useEffect(() => {
		if(!chat.current || !loadIndicator.current)
			return;

		//create observer
		let observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if(entry.target != loadIndicator.current)
					return;

				if(entry.isIntersecting && offset < totalPages && !isLoading)
					dispatch(chatMessagesStart());
			});
		}, {root: chat.current, threshold: 1});

		//connect
		observer.observe(loadIndicator.current);

		return () => {
			observer.unobserve(loadIndicator.current);
			observer.disconnect();
		};
	}, []);

	const toggleSelect = (id: string) => {
		dispatch(chatSelectedToggle(id));
	};

	let lastDate = dateToString(messages[0]?.time);

	return (
		<div className={styles.chat} ref={chat}>
			<LoadingMessages/>

			{
				messages.map((message, index) => {
					//check same date as previous
					const isSame = lastDate == dateToString(message.time);
					lastDate = dateToString(message.time);

					return (
						<>
							{!isSame && <RelativeDate time={messages[index - 1].time}/>}

							<div  key={message._id} className={cn(styles.chat_message, 'fa', {
								[styles.noHover]: message.type == MessageTypes.SPECIAL,
								[styles.unreaded]: !message.readed,
								[styles.selected]: selected.includes(message._id)
							})} onClick={() => toggleSelect(message._id)}>
								<Message message={message}/>
							</div>
						</>
					)
				})
			}

			{!!messages.length && <RelativeDate time={messages.slice(-1)[0]?.time}/>}
			<span ref={loadIndicator}/>
			{offset < totalPages && <div className="center"><span>Loading...</span></div>}
		</div>
	);
};

export default Messages;
