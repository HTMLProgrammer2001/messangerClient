import React from 'react';
import {useSelector} from 'react-redux';

import styles from '../styles.module.scss';
import UserAvatar from '../../../../../Common/UserAvatar';
import MessageInput from '../MessageInput';
import {selectMeInfo} from '../../../../../../redux/me/slice';


const MessageType: React.FC<{}> = () => {
	const user = useSelector(selectMeInfo);

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

export default MessageType;
