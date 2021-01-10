import React from 'react';


import styles from '../SettingsPopup/styles.module.scss';
import {IUser} from '../../../interfaces/IUser';

import UserInfo from '../SettingsPopup/UserInfo';
import MessageBut from './MessageBut';
import UserData from './Items/UserData';
import UserNotification from './Items/UserNotification';
import Actions from './Items/Actions';


type IUserPopupProps = {
	user: IUser
}

const UserPopup: React.FC<IUserPopupProps> = ({user}) => (
	<div className={styles.wrapper}>
		<div className={styles.header}>
			<div className={styles.row}>
				<b>User profile</b>
				<i className="fas fa-phone"/>
			</div>

			<UserInfo user={user} isProfile={false}/>
			<MessageBut nick={user.nickname}/>
		</div>

		<div className={styles.content}>
			<UserData user={user}/>
			<UserNotification/>
			<Actions user={user}/>
		</div>
	</div>
);

export default UserPopup;
