import React, {useContext} from 'react';

import {IUser} from '../../../interfaces/IUser';
import styles from './styles.module.scss';

import UserAvatar from '../../Common/UserAvatar';
import PopUpContext from '../../../utils/context/PopUpContext';
import NewNamePopUp from '../NewNamePopup';


type IUserInfo = {
	user: IUser,
	isProfile?: boolean
}

const UserInfo: React.FC<IUserInfo> = ({user, isProfile = true}) => {
	const {setElement} = useContext(PopUpContext);

	const changeNameHandler = () => {
		if(isProfile)
			setElement(() => <NewNamePopUp/>);
	};

	return (
		<div className={styles.info}>
			<UserAvatar name={user.name} avatar={user.avatar} profile={isProfile}/>

			<div className={styles.info_row}>
				<div className={styles.info_name} onClick={changeNameHandler}>
					{user.name}
				</div>

				<div className={styles.info_status}>
					{isProfile || user.isOnline ? 'online' : `Was at ${new Date(user.lastSeen).toLocaleString()}`}
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
