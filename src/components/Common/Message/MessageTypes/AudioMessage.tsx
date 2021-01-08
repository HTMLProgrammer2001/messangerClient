import React from 'react';

import {IMessage} from '../../../../interfaces/IMessage';


type IAudioMessageProps = {
	message: IMessage
}

const AudioMessage: React.FC<IAudioMessageProps> = ({message}) => (
	<audio src={message.url} controls={true} autoPlay={false}/>
);

export default AudioMessage;
