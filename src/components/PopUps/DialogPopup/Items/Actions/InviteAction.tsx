import React, {useContext} from 'react';
import cn from 'classnames';

import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';
import PopUpContext from '../../../../../utils/context/PopUpContext';
import InvitePopup from '../../../InvitePopup';


type IInviteActionProps = {dialog: IDialog}

const InviteAction: React.FC<IInviteActionProps> = ({dialog}) => {
	const {setElement} = useContext(PopUpContext),
		inviteHandler = () => {
			setElement(() => <InvitePopup dialogID={dialog._id}/>)
		};

	return (
		<div>
			<i className="fas fa-user"/>

			<span
				className={cn(styles.action, {[styles.disabled]: false})}
				onClick={inviteHandler}
			>
					Invite members
				</span>
		</div>
	);
};

export default InviteAction;
