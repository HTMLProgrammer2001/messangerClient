import React from 'react';
import {useDispatch} from 'react-redux';

import styles from '../styles.module.scss';
import {IMessageProps} from '../index';
import {sendMessageCancel} from '../../../../redux/sendMessage/slice';
import Wrapper from './Wrapper';


const TextMessage: React.FC<IMessageProps> = ({message, isLoading}) => {
	const dispatch = useDispatch();

	return (
		<Wrapper message={message}>
			<div onClick={() => isLoading && dispatch(sendMessageCancel(message._id))}>
				<pre className={styles.text}>
					{message.message}
				</pre>
			</div>
		</Wrapper>
	);
};

export default TextMessage;
