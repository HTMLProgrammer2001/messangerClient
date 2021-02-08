import axios from 'axios';

import {IDialog} from '../../interfaces/IDialog';


const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/'
});

const groupActionsAPI = {
	create(participants: string[], name: string){
		return client.post<{dialog: IDialog}>('/groups', {participants, name}, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	}
};

export default groupActionsAPI;
