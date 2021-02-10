import React from 'react';
import {useHistory} from 'react-router';

import {IParticipant} from '../../../../../interfaces/IParticipants';
import {IDialog} from '../../../../../interfaces/IDialog';
import {ParticipantsTypes} from '../../../../../constants/ParticipantTypes';


type IActionProps = {myRole: ParticipantsTypes, userRole: ParticipantsTypes, isMe: boolean}

const Actions: React.FC<IActionProps> = ({myRole, userRole, isMe}) => {
	if(isMe)
		return <li>Leave</li>;

	if(myRole >= ParticipantsTypes.ADMIN && userRole < ParticipantsTypes.ADMIN)
		return <li>Ban</li>;

	if(myRole == ParticipantsTypes.OWNER)
		return (
			<>
				<li>{userRole == ParticipantsTypes.ADMIN ? 'Make user' : 'Make admin'}</li>
				<li>Make owner</li>
			</>
		);

	return null;
};

type IParticipantItemProps = {
	participant: IParticipant,
	dialog: IDialog,
	isMe: boolean
}

const ParticipantItem: React.FC<IParticipantItemProps> = ({participant: {user, role}, dialog, isMe}) => {
	//hooks
	const history = useHistory();

	const userHandler = () => history.push(`/?dlg=${user.nickname}`);

	return (
		<div>
			<div>
				<b onClick={userHandler}>{user.name}({role})</b>
				<div>{user.isOnline ? 'online' : `Was at ${new Date(user.lastSeen).toLocaleString()}`}</div>
			</div>

			<ul>
				<Actions myRole={dialog.myRole} userRole={role} isMe={isMe}/>
			</ul>
		</div>
	);
};

export default ParticipantItem;
