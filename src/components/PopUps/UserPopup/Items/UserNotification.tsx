import React from 'react';

import styles from '../../SettingsPopup/styles.module.scss';
import Switch from '../../../Common/Switch';


const UserNotification: React.FC<{}> = () => (
	<div className={styles.content_item}>
		<i className={`fas fa-bell ${styles.content_item_icon}`}/>

		<div className={styles.content_item_data}>
			<div className={styles.switcher}>
				<div>Notification</div>
				<Switch onChange={() => null}/>
			</div>
		</div>
	</div>
);

export default UserNotification;
