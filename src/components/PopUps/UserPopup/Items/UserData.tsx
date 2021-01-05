import React from 'react';

import {IUser} from '../../../../interfaces/IUser';
import styles from '../../SettingsPopup/styles.module.scss';


type IUserDataProps = {
	user: IUser
}

const UserData: React.FC<IUserDataProps> = ({user}) => (
	<div className={styles.content_item}>
		<i className={`fas fa-phone ${styles.content_item_icon}`}/>

		<div className={styles.content_item_data}>
			<div>
				<div>{user.phone}</div>
				<div className="muted small">Phone</div>
			</div>

			<div>
				<div className="additional">@{user.nickname}</div>
				<div className="muted small">Nick</div>
			</div>
		</div>
	</div>
);

export default UserData;
