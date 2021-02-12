import React, {useContext} from 'react';
import {useHistory} from 'react-router';
import {useDispatch} from 'react-redux';

import styles from '../../styles.module.scss';
import {IParticipant} from '../../../../../interfaces/IParticipants';
import {IDialog} from '../../../../../interfaces/IDialog';
import {ParticipantsTypes} from '../../../../../constants/ParticipantTypes';
import participantsCodeToString from '../../../../../utils/helpers/participantsCodeToString';
import {searchSetCurrent} from '../../../../../redux/search/state/slice';

import UserAvatar from '../../../../Common/UserAvatar';
import PopUpContext from '../../../../../utils/context/PopUpContext';
import ParticipantActions from './ParticipantActions';


type IParticipantItemProps = {
	participant: IParticipant,
	changeHandler: (newPart: IParticipant) => void,
	dialog: IDialog,
	isMe: boolean
}

const ParticipantItem: React.FC<IParticipantItemProps> = ({participant, dialog, isMe, changeHandler}) => {
	//hooks
	const history = useHistory(),
		dispatch = useDispatch(),
		{setElement} = useContext(PopUpContext);

	//handlers
	const userHandler = () => {
		history?.push(`/?dlg=${participant.user.nickname}`);
		dispatch(searchSetCurrent(participant.user.nickname));
		setElement(null);
	};

	return (
		<div className={styles.participant}>
			<div className={styles.participant_data}>
				<UserAvatar name={participant.user.name} avatar={participant.user.avatar} size={40}/>

				<div className={styles.participant_info}>
					<b onClick={userHandler} className={styles.participant_name}>
						{participant.user.name}
						{participant.role != ParticipantsTypes.USER && `(${participantsCodeToString(participant.role)})`}
					</b>

					<div className={styles.participant_last}>
						{
							participant.user.isOnline ?
								'online'
								:
								`Was at ${new Date(participant.user.lastSeen).toLocaleString()}`
						}
					</div>
				</div>
			</div>

			<ul className={styles.participant_actions}>
				<ParticipantActions
					myRole={dialog.myRole}
					part={participant}
					isMe={isMe}
					changeHandler={changeHandler}
					dlgID={dialog._id}
				/>
			</ul>
		</div>
	);
};

export default ParticipantItem;
