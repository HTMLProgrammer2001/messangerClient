import React from 'react';

import styles from '../styles.module.scss';


type IReceiveControl = {
	cancel: () => void,
	accept: () => void
}

const ReceiveControl: React.FC<IReceiveControl> = ({cancel, accept}) => (
	<div className={styles.control}>
		<div className={styles.control_accept} onClick={accept}>
			<i className="fas fa-phone"/>
		</div>

		<div className={styles.control_cancel} onClick={cancel}>
			<i className="fas fa-phone-slash"/>
		</div>
	</div>
);

export default ReceiveControl;
