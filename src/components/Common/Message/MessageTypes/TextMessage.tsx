import React from 'react';
import {useDispatch} from 'react-redux';

import styles from '../styles.module.scss';
import {IMessageProps} from '../index';
import {sendMessageCancel} from '../../../../redux/sendMessage/slice';
import parseMessage from '../../../../utils/helpers/parseMessage';

import Wrapper from './Wrapper';


const TextMessage: React.FC<IMessageProps> = ({message, isLoading}) => {
	const dispatch = useDispatch(),
		handler = (e: React.MouseEvent) => {
			if(isLoading)
				dispatch(sendMessageCancel(message._id));

			e.stopPropagation();
		};

	return (
		<Wrapper message={message}>
			<div onClick={handler}>
				<p className={styles.text}>{parseMessage(message.message)}</p>
			</div>
		</Wrapper>
	);
};

export default TextMessage;
