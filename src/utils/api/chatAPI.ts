import axios from 'axios';

import {IGetDialogResponse} from '../../interfaces/Responses/chat/IGetDialogResponse';


const client = axios.create({
	baseURL: process.env.API_URL || 'http://localhost:5000/'
});


const chatAPI = {
	getDialogByNick(nick: string){
		return client.get<IGetDialogResponse>(`/dialogs/nickname/${nick}`, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		})
	}
};

export default chatAPI;
