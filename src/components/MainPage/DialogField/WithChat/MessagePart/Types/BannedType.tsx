import React from 'react';

import styles from '../styles.module.scss';


const BannedType: React.FC<{}> = () => (
	<div className={styles.user_row}>
		<div className="red">You was banned by this user</div>
	</div>
);

export default BannedType;
