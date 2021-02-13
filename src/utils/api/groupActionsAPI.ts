import axios, {CancelToken} from 'axios';

import {IDialog} from '../../interfaces/IDialog';
import {IGetParticipantsResponse} from '../../interfaces/Responses/group/IGetParticipantsResponse';


const client = axios.create({
	baseURL: (process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/groups'
});

const groupActionsAPI = {
	create(participants: string[], name: string){
		return client.post<{dialog: IDialog}>('/', {participants, name}, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},

	getParticipants(dialogID: string, cancel: CancelToken){
		return client.get<IGetParticipantsResponse>('/participants', {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			params: {dialog: dialogID},
			cancelToken: cancel
		});
	},

	changeAdmin(dialogID: string, partID: string, cancel?: CancelToken){
		return client.post('/changeAdmin', {dialog: dialogID, user: partID}, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			cancelToken: cancel
		});
	},

	changeOwner(dialogID: string, partID: string, cancel?: CancelToken){
		return client.post('/changeOwner', {dialog: dialogID, user: partID}, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			cancelToken: cancel
		});
	},

	leave(dialogID: string, cancel?: CancelToken){
		return client.post('/leave', {dialog: dialogID}, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			cancelToken: cancel
		})
	},

	ban(dialogID: string, userID: string, cancel?: CancelToken){
		return client.post('/ban', {dialog: dialogID, user: userID}, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			cancelToken: cancel
		})
	},

	deleteGroup(dialogID: string){
		return client.delete(`/${dialogID}`, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		})
	}
};

export default groupActionsAPI;
