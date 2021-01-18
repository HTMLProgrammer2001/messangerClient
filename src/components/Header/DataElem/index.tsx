import React from 'react';
import {useSelector} from 'react-redux';
import cn from 'classnames';
import {useLocation} from 'react-router';

import styles from '../styles.module.scss';
import {selectChatDialog, selectChatUser} from '../../../redux/chat/dialog/slice';

import DialogData from './DialogData';
import UserData from './UserData';


const DataElem: React.FC<{}> = () => {
	const location = useLocation(),
		params = new URLSearchParams(location.search);

	let dialog = useSelector(selectChatDialog),
		user = useSelector(selectChatUser),
		isActive = !!dialog || !!user,
		elem = null;

	if(!params.get('dlg'))
		return null;

	if(dialog)
		elem = <DialogData dialog={dialog}/>;

	if(user)
		elem = <UserData user={user}/>;

	return (
		<div className={cn(styles.menuElem, {
			[styles.active]: isActive
		})}>
			{elem}
		</div>
	);
};

export default DataElem;
