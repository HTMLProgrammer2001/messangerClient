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
			setElement(() => <UserPopup user={user}/>)
		};

	return (
		<div className={styles.wrapper} onClick={handler}>
			<div>{user.name}</div>
		</div>
	);
};

export default UserData;
