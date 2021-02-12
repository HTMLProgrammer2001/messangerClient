import React from 'react';

import {IDialog} from '../../../../../interfaces/IDialog';
import styles from '../../styles.module.scss';

import InviteAction from './InviteAction';
import NotificationAction from './NotificationAction';
import ClearAction from './ClearAction';
import DeleteAction from './DeleteAction';


type IDialogActionsProps = {
	dialog: IDialog
}

const DialogActions: React.FC<IDialogActionsProps> = ({dialog}) => {
	if(!dialog.isActive)
		return null;

	return (
		<div className={styles.content_item}>
			<InviteAction dialog={dialog}/>
			<NotificationAction dialog={dialog}/>
			<ClearAction dialog={dialog}/>
			<DeleteAction dialog={dialog}/>
		</div>
	);
};

export default DialogActions;
