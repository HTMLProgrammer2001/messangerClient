import React from 'react';

import {IMessage} from '../../../interfaces/IMessage';
import {MessageTypes} from '../../../constants/MessageTypes';

import TextMessage from './MessageTypes/TextMessage';
import ImageMessage from './MessageTypes/ImageMessage';
import AudioMessage from './MessageTypes/AudioMessage';
import VideoMessage from './MessageTypes/VideoMessage';
import DocumentMessage from './MessageTypes/DocumentMessage';
import SpecialMessage from './MessageTypes/SpecialMessage';


type IMessageProps = {
	message: IMessage
}

const Message: React.FC<IMessageProps> = ({message}) => {
	switch (message.type) {
		case MessageTypes.MESSAGE:
			return <TextMessage message={message}/>;

		case MessageTypes.IMAGE:
			return <ImageMessage message={message}/>;

		case MessageTypes.AUDIO:
			return <AudioMessage message={message}/>;

		case MessageTypes.VIDEO:
			return <VideoMessage message={message}/>;

		case MessageTypes.DOCUMENT:
			return <DocumentMessage message={message}/>;

		case MessageTypes.SPECIAL:
			return <SpecialMessage message={message}/>;

		default:
			return null;
	}
};

export default Message;
