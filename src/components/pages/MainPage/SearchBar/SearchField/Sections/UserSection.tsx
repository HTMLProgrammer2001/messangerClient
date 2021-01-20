import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import styles from './styles.module.scss';
import {IDialog} from '../../../../../../interfaces/IDialog';
import {selectSearchCurrent, searchSetCurrent} from '../../../../../../redux/search/state/slice';
import {selectSearchUsersData} from '../../../../../../redux/search/users/slice';
import {selectSearchDialogsStateData} from '../../../../../../redux/search/dialogs/slice';

import SearchItem from '../SearchItem';


const UserSection: React.FC<{}> = () => {
	//get data
	const user = useSelector(selectSearchUsersData),
		dialogs = useSelector(selectSearchDialogsStateData) as IDialog[],
		current = useSelector(selectSearchCurrent);

	//get hooks
	const dispatch = useDispatch(),
		history = useHistory();

	//click handler
	const changeCurrent = (nick: string) => {
		if (current == nick) {
			//if this is current than set null
			history?.push('/');
			dispatch(searchSetCurrent(null));
		} else {
			//set this as current
			history?.push(`/?dlg=${nick}`);
			dispatch(searchSetCurrent(nick));
		}
	};

	if (!user || dialogs.some(dialog => dialog.nick == user.nickname))
		return null;

	return (
		<div>
			<b className={styles.header}>User</b>

			{
				user &&
				<SearchItem
					dlgProps={{...user, text: 'Start messaging'}}
					isCurrent={current == user.nickname}
					handler={() => changeCurrent(user.nickname)}
				/>
			}
		</div>
	);
};

export default UserSection;
