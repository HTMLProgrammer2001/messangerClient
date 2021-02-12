import React from 'react';
import {toast} from 'react-toastify';

import styles from '../../styles.module.scss';
import {ParticipantsTypes} from '../../../../../constants/ParticipantTypes';
import {IParticipant} from '../../../../../interfaces/IParticipants';
import useApi from '../../../../../utils/hooks/useApiCall';
import groupActionsAPI from '../../../../../utils/api/groupActionsAPI';

type IActionProps = {
	myRole: ParticipantsTypes,
	part: IParticipant,
	isMe: boolean,
	changeHandler: (newPart: IParticipant) => void,
	dlgID: string
}

const ParticipantActions: React.FC<IActionProps> = ({myRole, part, isMe, dlgID, changeHandler}) => {
	const adminState = useApi(groupActionsAPI.changeAdmin),
		ownerState = useApi(groupActionsAPI.changeOwner),
		leaveState = useApi(groupActionsAPI.leave),
		actionsElems: any[] = [];

	//handlers
	const changeAdminHandler = async () => {
			if (adminState.isLoading)
				return adminState.cancel();

			const msg = await adminState.call(dlgID, part.user._id);
			if (msg) return toast.error(msg);

			const isAdmin = part.role == ParticipantsTypes.ADMIN;
			changeHandler({...part, role: isAdmin ? ParticipantsTypes.USER : ParticipantsTypes.ADMIN});
		},
		changeOwnerHandler = async () => {
			if (ownerState.isLoading)
				return ownerState.cancel();

			const msg = await ownerState.call(dlgID, part.user._id);
			if (msg) return toast.error(msg);

			changeHandler({...part, role: ParticipantsTypes.OWNER});
		},
		leaveHandler = async () => {
			if (leaveState.isLoading)
				return leaveState.cancel();

			const msg = await leaveState.call(dlgID);
			if (msg) return toast.error(msg);

			changeHandler({...part, role: 0});
		};

	if (myRole <= ParticipantsTypes.ADMIN && part.role >= ParticipantsTypes.ADMIN && myRole != part.role)
		actionsElems.push(<li>Ban</li>);

	if (myRole == ParticipantsTypes.OWNER)
		actionsElems.push(
			<>
				<li
					onClick={changeAdminHandler}
					className={adminState.isLoading ? styles.disabled : ''}
				>
					{part.role == ParticipantsTypes.ADMIN ? 'User' : 'Admin'}
				</li>

				<li
					onClick={changeOwnerHandler}
					className={ownerState.isLoading ? styles.disabled : ''}
				>
					Owner
				</li>
			</>
		);

	return isMe ? (
			<li
				onClick={leaveHandler}
				className={leaveState.isLoading ? styles.disabled : ''}
			>Leave</li>
	) : <>{actionsElems}</>;
};

export default ParticipantActions;
