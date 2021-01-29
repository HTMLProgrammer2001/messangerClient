import React from 'react';

import styles from '../styles.module.scss';


type IReceiveControl = {
	cancel: () => void,
	accept: () => void
}

const ReceiveControl: React.FC<IReceiveControl> = ({cancel, accept}) => (
	<div className={styles.control}>
		<div className={styles.control_accept} onClick={accept}>Accept</div>
		<div className={styles.control_cancel} onClick={cancel}>Cancel</div>
	</div>
);

export default ReceiveControl;
