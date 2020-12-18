import React from 'react';
import {useDispatch} from 'react-redux';

import getInitials from '../../../utils/helpers/getInitials';
import styles from './styles.module.scss';
import userActionsAPI from '../../../utils/api/userActionsAPI';
import {meSet} from '../../../redux/me/actions';


type IUserAvatarProps = {
	avatar?: string,
	size?: number,
	name: string,
	profile?: boolean
};

const UserAvatar: React.FC<IUserAvatarProps> = ({avatar, name, size = 60, profile = false}) => {
	const dispatch = useDispatch();

	const deleteAvatar = async () => {
		const resp = await userActionsAPI.deleteAvatar();
		dispatch(meSet(resp.data.newUser));
	};

	return (
		<div className={styles.wrapper}>
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

			{
				profile && avatar &&
					<div className={styles.delete} onClick={deleteAvatar}>&times;</div>
			}
		</div>
	);
};

export default UserAvatar;
