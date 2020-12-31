import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import styles from './styles.module.scss';
import {searchSetCurrent, selectSearchState} from '../../../../../redux/search/state/slice';
import {
	selectSearchDialogsState, selectSearchDialogsStateData,
	searchDialogsStartName, searchDialogsStartNick
} from '../../../../../redux/search/dialogs/slice';

import SearchItem from '../SearchItem';
import Loader from '../../../../Common/Loader';
import secondsToDate from '../../../../../utils/helpers/secondsToDate';


const DialogsSection: React.FC<{}> = () => {
	//get data from store
	const dialogs = useSelector(selectSearchDialogsStateData),
		{isLoading, offset, total, totalPages} = useSelector(selectSearchDialogsState),
		{current, type, text} = useSelector(selectSearchState);

	//hooks
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

	//load more handler
	const loadMore = () => {
		if (type != 1)
			dispatch(searchDialogsStartName({name: text, offset: offset + 1}));
		else
			dispatch(searchDialogsStartNick({nick: text.slice(1), offset: offset + 1}));
	};

	if (!dialogs.length)
		return null;

	return (
		<div>
			<b className={styles.header}>Dialogs({total})</b>

			<div>
				{
					dialogs.map(dialog => {
						//get time
						const time = dialog.lastMessage?.time && secondsToDate(dialog.lastMessage.time);

						let text = 'History was deleted';

						if(dialog.lastMessage)
							text = `${dialog.lastMessage.author.name}: ${dialog.lastMessage.message}`;

						return (
							<SearchItem
								key={dialog.nick}
								dlgProps={{...dialog, time, text}}
								isCurrent={current == dialog.nick}
								handler={() => changeCurrent(dialog.nick)}
							/>
						)
					})
				}
			</div>

			{isLoading && <Loader/>}
			{!isLoading && offset < totalPages && <div onClick={loadMore} className={styles.more}>More...</div>}
		</div>
	);
};

export default DialogsSection;
