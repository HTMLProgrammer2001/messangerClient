import React, {useContext} from 'react';

import {IUser} from '../../../interfaces/IUser';
import styles from './styles.module.scss';
import UserAvatar from '../../Common/UserAvatar';
import PopUpContext from '../../../utils/context/PopUpContext';
import NewNamePopUp from '../NewNamePopup';


type IUserInfo = {
	user: IUser
}

const UserInfo: React.FC<IUserInfo> = ({user}) => {
	const {setElement} = useContext(PopUpContext);

	const changeNameHandler = () => {
		setElement(() => <NewNamePopUp/>);
	};

	return (
		<div className={styles.info}>
			<UserAvatar name={user.name} avatar={user.avatar} profile/>

			<div className={styles.info_row}>
				<div className={styles.info_name} onClick={changeNameHandler}>
					{user.name}
				</div>

				<div className={styles.info_status}>
					online
				</div>
			</div>
		</div>
	);
};

export default UserInfo;
