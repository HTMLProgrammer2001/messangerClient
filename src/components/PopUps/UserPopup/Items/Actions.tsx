import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';

import styles from '../../SettingsPopup/styles.module.scss';
import {IUser} from '../../../../interfaces/IUser';
import {clearStart, selectClearState} from '../../../../redux/clear/slice';
import {banStart, selectBanState} from '../../../../redux/ban/slice';


type IActionsProps = {
	user: IUser
}

const Actions: React.FC<IActionsProps> = ({user}) => {
	const {isLoading: clearLoading} = useSelector(selectClearState),
		{isLoading: banLoading} = useSelector(selectBanState),
		dispatch = useDispatch(),
		clearHandler = () => {
			dispatch(clearStart({id: user._id, type: 1}));
		},
		banHandler = () => {
			dispatch(banStart(user._id));
		};

	return (
		<div className={styles.content_item}>
			<i className={`fas fa-settings ${styles.content_item_icon}`}/>

			<div className={styles.content_item_data}>
				<div
					className={cn(styles.action, {[styles.disabled]: banLoading})}
					onClick={banHandler}
				>{!user.isBanned ? 'Ban' : 'Unban'}</div>

				<div
					className={cn(styles.action, {[styles.disabled]: clearLoading})}
					onClick={clearHandler}
				>Clear history</div>
			</div>
		</div>
	);
};

export default Actions;
