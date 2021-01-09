import React from 'react';

import styles from '../styles.module.scss';
import {IMessage} from '../../../../interfaces/IMessage';
import Wrapper from './Wrapper';
import Video from '../../Video/';


type IVideoMessageProps = {
	message: IMessage
}

const VideoMessage: React.FC<IVideoMessageProps> = ({message}) => (
	<Wrapper message={message}>
		<div className={styles.video}>
			<Video url={message.url} size={message.size} name={message.message}/>
		</div>
	</Wrapper>
);

export default VideoMessage;
