import React from 'react';


import styles from '../SettingsPopup/styles.module.scss';
import {IUser} from '../../../interfaces/IUser';
import {selectUsers} from '../../../redux/users';

import UserInfo from '../SettingsPopup/UserInfo';
import MessageBut from './MessageBut';
import UserData from './Items/UserData';
import UserNotification from './Items/UserNotification';
import Actions from './Items/Actions';
import {useSelector} from 'react-redux';
import mapIdWith from '../../../utils/helpers/mapIdWith';


type IUserPopupProps = {
	userID: string
}

const UserPopup: React.FC<IUserPopupProps> = ({userID}) => {
	const users = useSelector(selectUsers),
		user = mapIdWith(userID, users) as IUser;

	return (
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
};

export default UserPopup;
