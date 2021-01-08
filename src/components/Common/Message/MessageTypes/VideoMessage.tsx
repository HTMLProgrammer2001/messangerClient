import React from 'react';

import {IMessage} from '../../../../interfaces/IMessage';


type IVideoMessageProps = {
	message: IMessage
}

const VideoMessage: React.FC<IVideoMessageProps> = ({message}) => (
	<video src={message.url} controls={true} autoPlay={false}/>
);

export default VideoMessage;
