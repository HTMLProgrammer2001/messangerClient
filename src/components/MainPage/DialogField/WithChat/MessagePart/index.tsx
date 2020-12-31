import React from 'react';
import {useSelector} from 'react-redux';

import UserAvatar from '../../../../Common/UserAvatar';
import MessageInput from './MessageInput';

import styles from './styles.module.scss';
import {IUser} from '../../../../../interfaces/IUser';
import {selectMeInfo} from '../../../../../redux/me/slice';


export const MessagePart: React.FC<{}> = () => {
	const user = useSelector(selectMeInfo) as IUser;

	return (
		<div className={styles.message_row}>
			<UserAvatar
				avatar={user.avatar}
				name={user.name}
			/>

			<MessageInput/>
		</div>
	);
};

export default MessagePart;
