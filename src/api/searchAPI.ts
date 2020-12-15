import axios from 'axios';

import {IGetUsersResponse} from '../interfaces/Responses/IGetUsersResponse';


const client = axios.create({
	baseURL: 'localhost:3000/api'
});


const searchAPI = {
	search(name: string, offset: number){
		return axios.get<IGetUsersResponse>('/search', {
			params: {name, page: offset},
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		});
	}
};

export default searchAPI;
