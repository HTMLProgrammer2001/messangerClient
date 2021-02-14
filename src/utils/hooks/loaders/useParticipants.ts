import {useCallback, useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';

import {IParticipant} from '../../../interfaces/IParticipants';
import groupActionsAPI from '../../api/groupActionsAPI';


const useParticipants = (dialogID: string) => {
	//create data
	const [participants, setParticipants] = useState<IParticipant[]>([]),
		[isLoading, setLoading] = useState(false),
		[wasError, setError] = useState(false),
		cancelSource = axios.CancelToken.source();

	//handlers
	const loadParticipants = useCallback(async () => {
		setLoading(true);
		setError(false);

		try {
			const {data} = await groupActionsAPI.getParticipants(dialogID, cancelSource.token);
			setParticipants(data.participants);
		} catch (e) {
			toast.error(e.response?.data.message || e.message);
			setError(true);
		} finally {
			setLoading(false);
		}
	}, [dialogID]);

	return {cancelSource, isLoading, wasError, loadParticipants, participants, setParticipants};
};

export default useParticipants;
