import React from 'react';

import {IMessage} from '../../../../interfaces/IMessage';

import Wrapper from './Wrapper';
import Audio from '../../Audio';
import {IMessageProps} from '../index';


const AudioMessage: React.FC<IMessageProps> = ({message}) => (
	<Wrapper message={message}>
		<Audio
			url={message.url}
			name={message.message}
			size={message.size}
		/>
	</Wrapper>
);

export default AudioMessage;
