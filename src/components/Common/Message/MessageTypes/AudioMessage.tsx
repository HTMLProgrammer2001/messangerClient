import React from 'react';
import {useDispatch} from 'react-redux';

import {IMessageProps} from '../index';
import {sendMessageCancel} from '../../../../redux/sendMessage/slice';
import Wrapper from './Wrapper';
import Audio from '../../Audio';


const AudioMessage: React.FC<IMessageProps> = ({message, isLoading, progress}) => {
	const dispatch = useDispatch(),
		cancel = () => {
			dispatch(sendMessageCancel(message._id));
		};

	return (
		<Wrapper message={message}>
			<Audio
				url={message.url}
				name={message.message}
				size={message.size}
				isLoading={isLoading}
				progress={progress}
				cancel={cancel}
			/>
		</Wrapper>
	);
};

export default AudioMessage;
