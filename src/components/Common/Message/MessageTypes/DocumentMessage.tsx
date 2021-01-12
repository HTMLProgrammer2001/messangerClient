import React from 'react';

import {IMessageProps} from '../index';

import DocumentElem from '../../Document/';
import Wrapper from './Wrapper';


const DocumentMessage: React.FC<IMessageProps> = ({message}) => (
	<Wrapper message={message}>
		<DocumentElem
			name={message.message}
			size={message.size}
			url={message.url}
		/>
	</Wrapper>
);

export default DocumentMessage;
