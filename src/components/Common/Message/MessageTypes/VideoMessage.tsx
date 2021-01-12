import React from 'react';

import styles from '../styles.module.scss';
import {IMessageProps} from '../index';

import Wrapper from './Wrapper';
import Video from '../../Video/';


const VideoMessage: React.FC<IMessageProps> = ({message, isLoading, progress}) => (
	<Wrapper message={message}>
		<div className={styles.video}>
			<Video
				url={message.url}
				size={message.size}
				name={message.message}
				isLoading={isLoading}
				progress={progress}
			/>
		</div>
	</Wrapper>
);

export default VideoMessage;
