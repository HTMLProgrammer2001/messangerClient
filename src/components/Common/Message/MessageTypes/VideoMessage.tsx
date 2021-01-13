import React from 'react';
import {useDispatch} from 'react-redux';

import styles from '../styles.module.scss';
import {sendMessageCancel} from '../../../../redux/sendMessage/slice';
import {IMessageProps} from '../index';

import Wrapper from './Wrapper';
import Video from '../../Video/';


const VideoMessage: React.FC<IMessageProps> = ({message, isLoading, progress}) => {
	const dispatch = useDispatch(),
		cancel = () => {
			dispatch(sendMessageCancel(message._id));
		};

	return (
		<Wrapper message={message}>
			<div className={styles.video}>
				<Video
					url={message.url}
					size={message.size}
					name={message.message}
					isLoading={isLoading}
					progress={progress}
					cancel={cancel}
				/>
			</div>
		</Wrapper>
	);
};

export default VideoMessage;
