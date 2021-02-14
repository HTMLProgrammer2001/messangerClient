import React from 'react';

import {IDialog} from '../../../../../interfaces/IDialog';
import styles from '../../styles.module.scss';

import InviteAction from './InviteAction';
import NotificationAction from './NotificationAction';
import ClearAction from './ClearAction';
import DeleteAction from './DeleteAction';
import {ParticipantsTypes} from '../../../../../constants/ParticipantTypes';


type IDialogActionsProps = {
	dialog: IDialog
}

const DialogActions: React.FC<IDialogActionsProps> = ({dialog}) => (
	<div className={styles.content_item}>
		{dialog.isActive && <InviteAction dialog={dialog}/>}
		{dialog.isActive && <NotificationAction dialog={dialog}/>}
		<ClearAction dialog={dialog}/>
		{dialog.myRole <= ParticipantsTypes.OWNER && dialog.isActive && <DeleteAction dialog={dialog}/>}
	</div>
);

export default DialogActions;
