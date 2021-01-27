import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from '../styles.module.scss';
import {chatMessagesStart, selectChatMessages, selectChatMessagesState} from '../../../../../../../redux/chat/messages/slice';
import {chatSelectedToggle, selectChatSelectedState} from '../../../../../../../redux/chat/selected';
import {selectChatDialog} from '../../../../../../../redux/chat/dialog/slice';
import useInterObserver from '../../../../../../../utils/hooks/useInterObserver';

import RelativeDate from '../../../../../../Common/RelativeDate';
import LoadingMessages from './LoadingMessages';
import Messages from './Messages';


const ChatData: React.FC = () => {
	//get data from store
	const messages = useSelector(selectChatMessages),
		selected = useSelector(selectChatSelectedState),
		dialog = useSelector(selectChatDialog),
		{isLoading, offset, totalPages} = useSelector(selectChatMessagesState),
		dispatch = useDispatch();

	const toggleSelect = (id: string) => {
		dispatch(chatSelectedToggle(id));
	};

	//refs
	const chat = useRef<HTMLDivElement>(null),
		loadIndicator = useRef<HTMLSpanElement>(null);

	//init intersection observer
	useInterObserver(chat, loadIndicator, entries => {
		entries.forEach(entry => {
			if(entry.target != loadIndicator.current)
				return;

			if(entry.isIntersecting && offset < totalPages && !isLoading)
				dispatch(chatMessagesStart());
		});
	});

	return (
		<div className={styles.chat} ref={chat}>
			{dialog.status && <div className={styles.status}>{dialog.status}</div>}
			<LoadingMessages/>
			<Messages messages={messages} selected={selected} toggle={toggleSelect}/>

			{!!messages.length && <RelativeDate time={messages.slice(-1)[0]?.time}/>}
			<span ref={loadIndicator}/>
			{offset < totalPages && <div className="center"><span>Loading...</span></div>}
		</div>
	);
};

export default ChatData;
