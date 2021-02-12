import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';
import {IParticipant} from '../../../../../interfaces/IParticipants';
import {selectMeState} from '../../../../../redux/me/slice';
import useParticipants from '../../../../../utils/hooks/loaders/useParticipants';

import Loader from '../../../../Common/Loader';
import ParticipantItem from './ParticipantItem';


type IDialogParticipantsProps = {
	dialog: IDialog
}

const DialogParticipants: React.FC<IDialogParticipantsProps> = ({dialog}) => {
	//create data
	const {user: me} = useSelector(selectMeState),
		{
			isLoading, cancelSource, wasError,
			loadParticipants, participants, setParticipants
		} = useParticipants(dialog._id);

	useEffect(() => {
		loadParticipants();
		return () => cancelSource.cancel();
	}, []);

	const changeParticipantHandler = (newPart: IParticipant) => {
		setParticipants(
			participants
				.map(part => part.user == newPart?.user ? newPart : part)
				.filter(part => !!part.role)
		);
	};

	if (!dialog.isActive)
		return null;

	//sort participants
	const sortedParticipants = participants.sort((a, b) => {
		//current user always first in the list
		if(a.user._id == me)
			return -1;

		if(b.user._id == me)
			return 1;

		//other by alphabet
		return a.user.name.localeCompare(b.user.name);
	});

	return (
		<div className={styles.content_item}>
			<div>
				<div className={styles.center}>
					{isLoading && <Loader/>}
					{wasError && <div className="red">Error in loading occur</div>}
				</div>

				{sortedParticipants.map(part => (
					<ParticipantItem
						participant={part}
						changeHandler={changeParticipantHandler}
						dialog={dialog}
						key={part.user._id}
						isMe={me == part.user._id}
					/>
				))}
			</div>
		</div>
	);
};

export default DialogParticipants;
