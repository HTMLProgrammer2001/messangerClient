import React from 'react';

import {IMessage} from '../../../interfaces/IMessage';
import {MessageTypes} from '../../../constants/MessageTypes';

import TextMessage from './MessageTypes/TextMessage';
import ImageMessage from './MessageTypes/ImageMessage';
import AudioMessage from './MessageTypes/AudioMessage';
import VideoMessage from './MessageTypes/VideoMessage';
import DocumentMessage from './MessageTypes/DocumentMessage';
import SpecialMessage from './MessageTypes/SpecialMessage';
import ResendMessage from './MessageTypes/ResendMessage';


export type IMessageProps = {
	message: IMessage,
	isLoading?: boolean,
	progress?: number
}

const Message: React.FC<IMessageProps> = ({message, isLoading = false, progress = null}) => {
	let Elem: React.FC<IMessageProps> = null;

	switch (message.type) {
		case MessageTypes.MESSAGE:
			Elem = TextMessage;
			break;

		case MessageTypes.IMAGE:
			Elem = ImageMessage;
			break;

		case MessageTypes.AUDIO:
			Elem = AudioMessage;
			break;

		case MessageTypes.VIDEO:
			Elem = VideoMessage;
			break;

		case MessageTypes.DOCUMENT:
			Elem = DocumentMessage;
			break;

		case MessageTypes.SPECIAL:
			Elem = SpecialMessage;
			break;

		case MessageTypes.RESEND:
			Elem = ResendMessage;
			break;
	}

	return Elem ?
		<Elem message={message} isLoading={isLoading} progress={progress}/>
			:
		<div>Unknown message type</div>;
};

export default Message;
