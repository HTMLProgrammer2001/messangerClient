import React from 'react';

import styles from '../styles.module.scss';


type ISpeakControl = {
	cancel: () => void,
	micro: () => void,
	video: () => void
}

const SpeakControl: React.FC<ISpeakControl> = ({video, cancel, micro}) => (
	<div className={styles.control}>
		<div className={styles.control_cancel} onClick={cancel}>Cancel</div>
		<div className={styles.control_off} onClick={micro}>Off micro</div>
		<div className={styles.control_off} onClick={video}>Off video</div>
	</div>
);

export default SpeakControl;
