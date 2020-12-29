import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';

import styles from './styles.module.scss';
import {IMessage} from '../../../../../interfaces/IMessage';
import {selectSearchCurrent, selectSearchMessages, searchSetCurrent} from '../../../../../redux/search/slice';

import SearchItem from '../SearchItem';


const MessagesSection: React.FC<{}> = () => {
	//get data from store
	const messages = useSelector(selectSearchMessages) as IMessage[],
		current = useSelector(selectSearchCurrent);

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

	if (!messages.length)
		return null;

	return (
		<div>
			<b className={styles.header}>Messages</b>

			{
				messages.map(message => (
					<SearchItem
						dlgProps={{
							name: 'Dialog',
							time: new Date(message.time).toLocaleTimeString(),
							text: message.message,
							unreaded: 0,
							nick: message.dialog.nick,
							avatar: message.dialog.avatar
						}}
						isCurrent={current == `${message.dialog._id}_${message._id}`}
						handler={() => changeCurrent(message.dialog._id, message._id)}
					/>
				))
			}
		</div>
	);
};

export default MessagesSection;
