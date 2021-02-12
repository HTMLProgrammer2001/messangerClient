import React from 'react';
import cn from 'classnames';

import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';


type IInviteActionProps = {dialog: IDialog}

const InviteAction: React.FC<IInviteActionProps> = ({dialog}) => {
	return (
		<div>
			<i className="fas fa-user"/>

			<span
				className={cn(styles.action, {[styles.disabled]: false})}
			>
					Invite members
				</span>
		</div>
	);
};

export default InviteAction;
