import React from 'react';

import styles from '../styles.module.scss';


type ISpeakControl = {
	cancel: () => void,
	micro: () => void,
	video: () => void,
	isMicro: boolean,
	isVideo: boolean
}

const SpeakControl: React.FC<ISpeakControl> = ({video, cancel, micro, isVideo, isMicro}) => (
	<div className={styles.control}>
		<div className={styles.control_off} onClick={micro}>
			<i className={`fas ${isMicro ? 'fa-microphone' : 'fa-microphone-slash'}`}/>
		</div>

		<div className={styles.control_off} onClick={video}>
			<i className={`fas ${isVideo ? 'fa-video' : 'fa-video-slash'}`}/>
		</div>

		<div className={styles.control_cancel} onClick={cancel}>
			<i className="fas fa-phone-slash"/>
		</div>
	</div>
);

export default SpeakControl;
