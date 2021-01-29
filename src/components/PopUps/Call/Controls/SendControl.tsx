import React from 'react';

import styles from '../styles.module.scss';


type ISendControl = {
	cancel: () => void
}

const SendControl: React.FC<ISendControl> = ({cancel}) => (
	<div className={styles.control}>
		<div className={styles.control_cancel} onClick={cancel}>Cancel</div>
	</div>
);

export default SendControl;
