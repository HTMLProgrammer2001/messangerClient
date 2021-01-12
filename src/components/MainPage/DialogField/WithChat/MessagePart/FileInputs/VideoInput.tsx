import React from 'react';
import {useDispatch} from 'react-redux';

import styles from '../styles.module.scss';


const VideoInput: React.FC = () => {
	const dispatch = useDispatch();

	const handler = (e: React.ChangeEvent<HTMLInputElement>) => {

	};

	return (
		<span>
			<label>
				<i className={`fas fa-video ${styles.message_send}`}/>
				<input type="file" accept="video/*" multiple max={5} onChange={handler} hidden={true}/>
			</label>
		</span>
	);
};

export default VideoInput;
