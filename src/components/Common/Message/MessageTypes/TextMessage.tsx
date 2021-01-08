import React from 'react';

import {IMessage} from '../../../../interfaces/IMessage';

import Wrapper from './Wrapper';


type ITextMessageProps = {
	message: IMessage
}

const TextMessage: React.FC<ITextMessageProps> = ({message}) => (
	<Wrapper message={message}>
		{message.message}
	</Wrapper>
);

export default TextMessage;
