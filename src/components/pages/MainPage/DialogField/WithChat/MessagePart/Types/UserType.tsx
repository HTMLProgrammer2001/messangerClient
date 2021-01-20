import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from '../styles.module.scss';
import {selectCreatePersonalState, createPersonalStart} from '../../../../../../../redux/createPersonal/slice';
import {selectChatUser} from '../../../../../../../redux/chat/dialog/slice';


const UserType: React.FC<{}> = () => {
	const {isLoading} = useSelector(selectCreatePersonalState),
		user = useSelector(selectChatUser),
		dispatch = useDispatch();

	const handler = () => {
		dispatch(createPersonalStart(user._id));
	};

	return (
		<div className={styles.user_row}>
			<button
				className={styles.user_but}
				disabled={isLoading}
				onClick={handler}
			>Start</button>
		</div>
	);
};

export default UserType;
