import React from 'react';

import styles from './styles.module.scss';


const NoChat: React.FC<{}> = () => (
	<div className={styles.noChat}>
		<div className={styles.gray}>No selected chat.</div>
	</div>
);

export default NoChat;
