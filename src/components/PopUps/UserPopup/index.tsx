import React from 'react';
import {useDispatch, useSelector} from 'react-redux';


import styles from '../SettingsPopup/styles.module.scss';
import {IUser} from '../../../interfaces/IUser';
import {selectUsers} from '../../../redux/users';
import {callStart} from '../../../redux/call/slice';
import mapIdWith from '../../../utils/helpers/mapIdWith';

import UserInfo from '../SettingsPopup/UserInfo';
import MessageBut from './MessageBut';
import UserData from './Items/UserData';
import UserNotification from './Items/UserNotification';
import Actions from './Items/Actions';
import ClosePopUp from '../../Common/ClosePopUp';


type IUserPopupProps = {
	userID: string
}

const UserPopup: React.FC<IUserPopupProps> = ({userID}) => {
	const users = useSelector(selectUsers),
		user = mapIdWith(userID, users) as IUser,
		dispatch = useDispatch();

	const callHandler = () => dispatch(callStart(userID));

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.row}>
					<b>User profile</b>

					<div style={{display: 'flex'}}>
						<i className="fas fa-phone" onClick={callHandler}/>
						<ClosePopUp/>
					</div>
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
