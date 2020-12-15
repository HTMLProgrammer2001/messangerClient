import React from 'react';

import {IUser} from '../../interfaces/IUser';
import styles from './styles.module.scss';
import UserAvatar from '../Common/UserAvatar';


type IUserInfo = {
	user: IUser
}

const UserInfo: React.FC<IUserInfo> = ({user}) => (
	<div className={styles.info}>
		<UserAvatar name={user.name} avatar={user.avatar}/>

		<div className={styles.info_row}>
			<div className={styles.info_name}>
				{user.name}
			</div>

			<div className={styles.info_status}>
				online
			</div>
		</div>
	</div>
);

export default UserInfo;
