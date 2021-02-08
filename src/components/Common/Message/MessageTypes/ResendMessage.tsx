import React from 'react';
import {useDispatch} from 'react-redux';

import styles from '../styles.module.scss';
import {IMessageProps} from '../index';
import {sendMessageCancel} from '../../../../redux/sendMessage/slice';

import Wrapper from './Wrapper';
import MessageType from '../';


const ResendMessage: React.FC<IMessageProps> = ({message, isLoading}) => {
	const dispatch = useDispatch();

	return (
		<Wrapper message={message}>
			<div onClick={() => isLoading && dispatch(sendMessageCancel(message._id))} className={styles.resend}>
				{message.resend?.map((msg, i) =>
					<MessageType message={msg} key={message._id + '_' + msg._id + '_' + i}/>)}
			</div>
		</Wrapper>
	);
};

export default ResendMessage;
