import React from 'react';

import Wrapper from './Wrapper';
import {IMessageProps} from '../index';


const TextMessage: React.FC<IMessageProps> = ({message}) => (
	<Wrapper message={message}>
		{message.message}
	</Wrapper>
);

export default TextMessage;
