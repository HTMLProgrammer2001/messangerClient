import React from 'react';

import {IDialog} from '../../../../interfaces/IDialog';
import styles from '../styles.module.scss';

import Switch from '../../../Common/Switch';


type IDialogActionsProps = {
	dialog: IDialog
}

const DialogActions: React.FC<IDialogActionsProps> = ({dialog}) => {
	if(!dialog.isActive)
		return null;

	return (
		<div className={styles.content_item}>
			<div>
				<i className="fas fa-user"/>
				<span>Invite members</span>
			</div>

			<div className={styles.switcher}>
				<div>
					<i className="fas fa-bell"/>
					<span>Notifications</span>
				</div>

				<Switch
					onChange={() => false}
					curState={true}
				/>
			</div>

			<div>
				<i className="fas fa-list"/>
				<span>Clear</span>
			</div>
		</div>
	);
};

export default DialogActions;
