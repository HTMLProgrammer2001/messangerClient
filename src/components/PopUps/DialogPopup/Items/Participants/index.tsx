import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';

import styles from '../../styles.module.scss';
import {IDialog} from '../../../../../interfaces/IDialog';
import {IParticipant} from '../../../../../interfaces/IParticipants';

import groupActionsAPI from '../../../../../utils/api/groupActionsAPI';
import {selectMeState} from '../../../../../redux/me/slice';
import Loader from '../../../../Common/Loader';
import ParticipantItem from './ParticipantItem';


type IDialogParticipantsProps = {
	dialog: IDialog
}

const DialogParticipants: React.FC<IDialogParticipantsProps> = ({dialog}) => {
	//create data
	const [participants, setParticipants] = useState<IParticipant[]>([]),
		[isLoading, setLoading] = useState(false),
		[wasError, setError] = useState(false),
		cancelSource = axios.CancelToken.source();

	const {user: me} = useSelector(selectMeState);

	//handlers
	const loadParticipants = async () => {
		setLoading(true);
		setError(false);

		try {
			const {data} = await groupActionsAPI.getParticipants(dialog._id, cancelSource.token);
			setParticipants(data.participants);
		} catch (e) {
			toast.error(e.response?.data.message || e.message);
			setError(true);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		loadParticipants();
		return () => cancelSource.cancel();
	}, []);

	if (!dialog.isActive)
		return null;

	//sort participants
	const sortedParticipants = participants.sort((a, b) => {
		if(a.user._id == me)
			return -1;
		else if(b.user._id == me)
			return 1;

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
