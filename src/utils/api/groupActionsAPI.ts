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
	},

	invite(dialogID: string, users: string[]){
		return client.post('/invite',
			{dialog: dialogID, users},
			{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},

	changeTitle(dialogID: string, newTitle: string){
		return client.put(`/${dialogID}/title`,
			{title: newTitle},
			{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},
	changeAvatar(dialogID: string, newAvatar: Blob){
		let form = new FormData();
		form.set('avatar', newAvatar);

		return client.put(`/${dialogID}/avatar`, form, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},
	deleteAvatar(dialogID: string){
		return client.delete(`/${dialogID}/avatar`, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	}
};

export default groupActionsAPI;
