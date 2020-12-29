import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import styles from './styles.module.scss';
import {selectSearchCurrent, searchSetCurrent, selectSearchType, selectSearchText} from '../../../../../redux/search/state/slice';
import {
	selectSearchDialogsState, selectSearchDialogsStateData,
	searchDialogsStartName, searchDialogsStartNick
} from '../../../../../redux/search/dialogs/slice';

import SearchItem from '../SearchItem';
import Loader from '../../../../Common/Loader';


const DialogsSection: React.FC<{}> = () => {
	//get data from store
	const dialogs = useSelector(selectSearchDialogsStateData),
		{isLoading, offset, total, totalPages} = useSelector(selectSearchDialogsState),
		current = useSelector(selectSearchCurrent),
		type = useSelector(selectSearchType),
		text = useSelector(selectSearchText);

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

	//load more handler
	const loadMore = () => {
		if(type != 1)
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
					dialogs.map(dialog => (
						<SearchItem
							key={dialog.nick}
							dlgProps={{...dialog, time: '8:00AM', text: 'Text'}}
							isCurrent={current == dialog.nick}
							handler={() => changeCurrent(dialog.nick)}
						/>
					))
				}
			</div>

			{isLoading && <Loader/>}
			{offset < totalPages && <div onClick={loadMore}>More...</div>}
		</div>
	);
};

export default DialogsSection;
