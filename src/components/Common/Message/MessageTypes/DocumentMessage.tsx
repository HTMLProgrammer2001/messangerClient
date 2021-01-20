import React from 'react';
import {useDispatch} from 'react-redux';

import {IMessageProps} from '../index';

import DocumentElem from '../../Items/Document/';
import Wrapper from './Wrapper';
import {sendMessageCancel} from '../../../../redux/sendMessage/slice';


const DocumentMessage: React.FC<IMessageProps> = ({message, isLoading, progress}) => {
	const dispatch = useDispatch(),
		cancel = () => {
			dispatch(sendMessageCancel(message._id));
		};

	return (
		<Wrapper message={message}>
			<DocumentElem
				name={message.message}
				size={message.size}
				url={message.url}
				isLoading={isLoading}
				progress={progress}
				cancel={cancel}
			/>
		</Wrapper>
	);
};

export default DocumentMessage;
