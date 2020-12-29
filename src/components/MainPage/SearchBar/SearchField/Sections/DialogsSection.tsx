import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import styles from './styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';
import {selectSearchCurrent, selectSearchDialogs, searchSetCurrent} from '../../../../../redux/search/slice';

import SearchItem from '../SearchItem';


const DialogsSection: React.FC<{}> = () => {
	//get data from store
	const dialogs = useSelector(selectSearchDialogs) as IDialog[],
		current = useSelector(selectSearchCurrent);

	//hooks
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

	if (!dialogs.length)
		return null;

	return (
		<div>
			<b className={styles.header}>Dialogs</b>

			<div>
				{
					dialogs.map(dialog => (
						<SearchItem
							key={dialog.nick}
							dlgProps={{
								name: dialog.name,
								avatar: dialog.avatar,
								nick: dialog.nick,
								unreaded: dialog.unreaded,
								time: '8:00AM',
								text: 'Text'
							}}
							isCurrent={current == dialog.nick}
							handler={() => changeCurrent(dialog.nick)}
						/>
					))
				}
			</div>
		</div>
	);
};

export default DialogsSection;
