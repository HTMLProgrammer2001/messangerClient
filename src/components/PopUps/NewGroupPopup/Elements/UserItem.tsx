import React from 'react';
import classnames from 'classnames';

import {IUserShort} from '../../../../interfaces/IUserShort';
import styles from '../styles.module.scss';
import UserAvatar from '../../../Common/UserAvatar';


type IUserItemProps = {
	user: IUserShort,
	active: boolean,
	toggle: (id: number) => void
};

const UserItem: React.FC<IUserItemProps> = ({user, toggle, active}) => (
	<div
		className={classnames(styles.user, {[styles.active]: active})}
		onClick={() => toggle(user.id)}
	>
		<UserAvatar name={user.name} avatar={user.avatar} size={40}/>

		<div
			className={styles.user_name}
		>{user.name}</div>
	</div>
);

export default UserItem;
