import axios, {CancelToken} from 'axios';

import {IDialog} from '../../interfaces/IDialog';
import {IGetParticipantsResponse} from '../../interfaces/Responses/group/IGetParticipantsResponse';


const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/'
});

const groupActionsAPI = {
	create(participants: string[], name: string){
		return client.post<{dialog: IDialog}>('/groups', {participants, name}, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},
	getParticipants(dialogID: string, cancel: CancelToken){
		return client.get<IGetParticipantsResponse>('/groups/participants', {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			params: {dialog: dialogID},
			cancelToken: cancel
		});
	}
};

export default groupActionsAPI;
