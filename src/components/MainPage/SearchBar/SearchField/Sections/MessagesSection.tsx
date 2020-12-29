import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import styles from './styles.module.scss';
import {selectSearchCurrent, searchSetCurrent, selectSearchText} from '../../../../../redux/search/state/slice';
import {selectSearchMessagesState, selectSearchMessagesStateData, searchMessagesStart} from '../../../../../redux/search/messages/slice';

import SearchItem from '../SearchItem';
import Loader from '../../../../Common/Loader';


const MessagesSection: React.FC<{}> = () => {
	//get data from store
	const messages = useSelector(selectSearchMessagesStateData),
		{isLoading, totalPages, total, offset} = useSelector(selectSearchMessagesState),
		current = useSelector(selectSearchCurrent),
		text = useSelector(selectSearchText);

	//hooks
	const dispatch = useDispatch(),
		history = useHistory();

	//click handler
	const changeCurrent = (dlgNick: string, msgID) => {
		const code = `${dlgNick}_${msgID}`;

		if (current == code) {
			//if this is current than set null
			history?.push('/');
			dispatch(searchSetCurrent(null));
		} else {
			//set this as current
			history?.push(`/?dlg=${dlgNick}&msg=${msgID}`);
			dispatch(searchSetCurrent(code));
		}
	};

	//load more handler
	const loadMore = () => {
		dispatch(searchMessagesStart({text, offset: offset + 1}));
	};

	if (!messages.length)
		return null;

	return (
		<div>
			<b className={styles.header}>Messages({total})</b>

			{
				messages.map(message => (
					<SearchItem
						dlgProps={{
							name: 'Dialog',
							time: new Date(message.time).toLocaleTimeString(),
							text: message.message,
							nick: message.dialog.nick,
							avatar: message.dialog.avatar
						}}
						isCurrent={current == `${message.dialog._id}_${message._id}`}
						handler={() => changeCurrent(message.dialog._id, message._id)}
					/>
				))
			}

			{isLoading && <Loader/>}
			{offset < totalPages && <div onClick={loadMore}>More...</div>}
		</div>
	);
};

export default MessagesSection;
