import React from 'react';

import styles from '../styles.module.scss';
import Switch from '../../Common/Switch';


const NotificationSettings: React.FC<{}> = () => (
	<div className={styles.content_item}>
		<i className={`fas fa-bell ${styles.content_item_icon}`}/>

		<div className={styles.content_item_data}>
			<div className={styles.switcher}>
				<div>Push notification</div>
				<Switch onChange={(e:boolean) => {}}/>
			</div>

			<div className={styles.switcher}>
				<div>Sound</div>
				<Switch onChange={(e:boolean) => {}}/>
			</div>

			<div className={styles.switcher}>
				<div>Message preview</div>
				<Switch onChange={(e:boolean) => {}}/>
			</div>

			<div className={styles.switcher}>
				<div>Desktop notification</div>
				<Switch onChange={(e:boolean) => {}}/>
			</div>
		</div>
	</div>
);

export default NotificationSettings;
