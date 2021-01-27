import React, {useContext} from 'react';

import styles from './styles.module.scss';
import {IUser} from '../../../interfaces/IUser';

import PopUpContext from '../../../utils/context/PopUpContext';
import UserPopup from '../../PopUps/UserPopup';


type IUserDataProps = {
	user: IUser
}

const UserData: React.FC<IUserDataProps> = ({user}) => {
	const {setElement} = useContext(PopUpContext),
		handler = () => {
			setElement(() => <UserPopup userID={user._id}/>)
		};

	return (
		<div className={styles.wrapper} onClick={handler}>
			<div className={styles.data}>
				<div>{user.name}</div>

				<div className={styles.lastSeen}>
					{user.isOnline ? 'Online' : `Was at ${new Date(user.lastSeen).toLocaleString()}`}
				</div>
			</div>
		</div>
	);
};

export default UserData;
