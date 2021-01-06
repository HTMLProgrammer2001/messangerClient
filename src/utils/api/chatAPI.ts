import axios from 'axios';

import {IGetDialogResponse} from '../../interfaces/Responses/chat/IGetDialogResponse';
import {IGetUserResponse} from '../../interfaces/Responses/IGetUserResponse';


const client = axios.create({
	baseURL: process.env.API_URL || 'http://localhost:5000/'
});


const chatAPI = {
	getDialogByNick(nick: string){
		return client.get<IGetDialogResponse>(`/dialogs/nickname/${nick}`, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		})
	},
	getUserByNick(nick: string){
		return client.get<IGetUserResponse>(`/users/${nick}`, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},
	getMessagesForChat(chat: string, offset = 1){
		return client.get(`/messages/chat/${chat}`, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
				page: offset
			}
		})
	},

	createPersonal(id: string){
		return client.post<{message: string}>(`/dialogs/personal`, {to: id}, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	}
};

export default chatAPI;
