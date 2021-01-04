import React, {useContext} from 'react';

import styles from './styles.module.scss';
import {IUser} from '../../../interfaces/IUser';

import UserAvatar from '../../Common/UserAvatar';
import PopUpContext from '../../../utils/context/PopUpContext';


type IUserDataProps = {
	user: IUser
}

const UserData: React.FC<IUserDataProps> = ({user}) => {
	const {setElement} = useContext(PopUpContext),
		handler = () => {
			setElement(() => <div>{user.name}</div>)
		};

	return (
		<div className={styles.wrapper} onClick={handler}>
			<UserAvatar name={user.name} avatar={user.avatar} size={40}/>
			<div>{user.name}</div>
		</div>
	);
};

export default UserData;
