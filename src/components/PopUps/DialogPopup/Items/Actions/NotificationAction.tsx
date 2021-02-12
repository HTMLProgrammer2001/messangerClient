import React from 'react';

import styles from '../../styles.module.scss';
import Switch from '../../../../Common/Switch';
import {IDialog} from '../../../../../interfaces/IDialog';


type INotificationActionProps = {dialog: IDialog}

const NotificationAction: React.FC<INotificationActionProps> = ({dialog}) => {
	return (
		<div className={styles.switcher}>
			<div>
				<i className="fas fa-bell"/>
				<span>Notifications</span>
			</div>

			<Switch
				onChange={() => false}
				curState={true}
			/>
		</div>
	);
};

export default NotificationAction;
