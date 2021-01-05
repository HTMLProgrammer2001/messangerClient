import React from 'react';
import {useSelector} from 'react-redux';
import cn from 'classnames';

import styles from '../styles.module.scss';
import {selectChatDialog, selectChatUser} from '../../../redux/chat/dialog/slice';
import DialogData from './DialogData';
import UserData from './UserData';


const DataElem: React.FC<{}> = () => {
	let dialog = useSelector(selectChatDialog),
		user = useSelector(selectChatUser),
		isActive = !!dialog || !!user,
		elem = null;

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
