import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import styles from './styles.module.scss';
import {IUser} from '../../../../../interfaces/IUser';
import {IDialog} from '../../../../../interfaces/IDialog';
import {selectSearchCurrent, selectSearchUser, searchSetCurrent, selectSearchDialogs} from '../../../../../redux/search/slice';

import SearchItem from '../SearchItem';


const UserSection: React.FC<{}> = () => {
	//get data
	const user = useSelector(selectSearchUser) as IUser,
		dialogs = useSelector(selectSearchDialogs) as IDialog[],
		current = useSelector(selectSearchCurrent);

	//get hooks
	const dispatch = useDispatch(),
		history = useHistory();

	//click handler
	const changeCurrent = (nick: string) => {
		if(current == nick) {
			//if this is current than set null
			history?.push('/');
			dispatch(searchSetCurrent(null));
		}
		else {
			//set this as current
			history?.push(`/?dlg=${nick}`);
			dispatch(searchSetCurrent(nick));
		}
	};

	if(!user || dialogs.some(dialog => dialog.nick == user.nickname))
		return null;

	return (
		<div>
			<b className={styles.header}>User</b>

			<SearchItem
				dlgProps={{
					name: user.name,
					avatar: user.avatar,
					nick: user.nickname,
					unreaded: 0,
					time: '',
					text: 'Start messaging'
				}}
				isCurrent={current == user.nickname}
				handler={() => changeCurrent(user.nickname)}
			/>
		</div>
	);
};

export default UserSection;
