import React from 'react';

import styles from '../styles.module.scss';
import {IDialog} from '../../../../interfaces/IDialog';

import UserAvatar from '../../../Common/UserAvatar';


type IDialogInfoProps = {
	dialog: IDialog
}

const DialogInfo: React.FC<IDialogInfoProps> = ({dialog}) => (
	<div className={styles.info}>
		<UserAvatar name={dialog.name} avatar={dialog.avatar}/>

		<div className={styles.info_row}>
			<div className={styles.info_name} onClick={() => false}>{dialog.name}</div>

			<div className={styles.info_status}>
				{dialog.partCount} participants
			</div>
		</div>
	</div>
);

export default DialogInfo;
