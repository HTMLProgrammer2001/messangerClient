import React from 'react';

import getInitials from '../../../helpers/getInitials';
import styles from './styles.module.scss';


type IUserAvatarProps = {
	avatar?: string,
	size?: number,
	name: string
};

const UserAvatar: React.FC<IUserAvatarProps> = ({avatar, name, size = 60}) => (
	<div>
		{
			avatar ? 
				<img
					width={size}
					height={size}
					src={avatar} 
					className={styles.avatar}
				/> :
				<div
					style={{width: size, height: size}}
					className={styles.initials}
				>{getInitials(name)}</div>
		}
	</div>
);

export default UserAvatar;
