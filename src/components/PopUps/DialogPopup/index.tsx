import React from 'react';

import styles from './styles.module.scss';
import {IDialog} from '../../../interfaces/IDialog';

import DialogInfo from './Items/DIalogInfo';
import ClosePopUp from '../../Common/ClosePopUp';
import MessageBut from '../UserPopup/MessageBut';
import DialogActions from './Items/Actions/';
import DialogParticipants from './Items/Participants/';


type IDialogPopupProps = {
	dialog: IDialog
}

const DialogPopup: React.FC<IDialogPopupProps> = ({dialog}) => (
	<div className={styles.wrapper}>
		<div className={styles.header}>
			<div className={styles.row}>
				<b>Group info</b>
				<ClosePopUp/>
			</div>

			<DialogInfo dialog={dialog}/>
			<MessageBut nick={dialog.nick}/>
		</div>

		<div className={styles.content}>
			<DialogActions dialog={dialog}/>
			<DialogParticipants dialog={dialog}/>
		</div>
	</div>
);

export default DialogPopup;
