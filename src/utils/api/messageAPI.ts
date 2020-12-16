import axios from 'axios';

import {IGetDialogsResponse} from '../../interfaces/Responses/IGetDialogsResponse';


const client = axios.create({
	baseURL: 'localhost:3000/api'
});


const messageAPI = {
	getDialogs(offset: number){
		return axios.get<IGetDialogsResponse>('/dialogs', {
			params: {page: offset},
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});
	}
};

export default messageAPI;
