import axios from 'axios';

import {IPaginateResponse} from '../../interfaces/Responses/IPaginateResponse';
import {IDialog} from '../../interfaces/IDialog';
import {IGetUserResponse} from '../../interfaces/Responses/IGetUserResponse';


type IDialogsResponse = IPaginateResponse<IDialog>

const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/'
});


const searchAPI = {
	getDialogsByName(name: string, offset: number = 1){
		return client.get<IDialogsResponse>('/dialogs/name', {
			params: {name, page: offset, pageSize: 10},
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},
	getDialogsByNick(nick: string, offset: number = 1){
		return client.get<IDialogsResponse>('/dialogs/nickname', {
			params: {nickname: nick, page: offset, pageSize: 10},
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},
	getUser(nick: string){
		return client.get<IGetUserResponse>(`/users/nickname/${nick}`, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},
	getMessagesByText(text: string, offset: number = 1){
		return client.get<any>('/messages/text', {
			params: {text, page: offset, pageSize: 10},
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	}
};

export default searchAPI;
