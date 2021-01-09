import React from 'react';

import {IMessage} from '../../../../interfaces/IMessage';

import DocumentElem from '../../Document/';
import Wrapper from './Wrapper';


type IDocumentMessageProps = {
	message: IMessage
}

const DocumentMessage: React.FC<IDocumentMessageProps> = ({message}) => (
	<Wrapper message={message}>
		<DocumentElem
			name={message.message}
			size={message.size}
			url={message.url}
		/>
	</Wrapper>
);

export default DocumentMessage;
