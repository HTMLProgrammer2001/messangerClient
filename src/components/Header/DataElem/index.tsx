import React from 'react';
import {useSelector} from 'react-redux';
import cn from 'classnames';

import styles from '../styles.module.scss';
import {selectChatDialog} from '../../../redux/chat/dialog/slice';
import DialogData from './DialogData';


const DataElem: React.FC<{}> = () => {
	let dialog = useSelector(selectChatDialog),
		isActive = !!dialog,
		elem = null;

	if(dialog)
		elem = <DialogData dialog={dialog}/>;

	return (
		<div className={cn(styles.menuElem, {
			[styles.active]: isActive
		})}>
			{elem}
		</div>
	);
};

export default DataElem;
