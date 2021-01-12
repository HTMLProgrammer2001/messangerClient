import axios, {CancelToken, CancelTokenSource} from 'axios';

import {ISendMessage} from '../../redux/sendMessage/slice';
import {ISendMessageResponse} from '../../interfaces/Responses/chat/ISendMessageResponse';


const client = axios.create({
	baseURL: process.env.API_URL || 'http://localhost:5000'
});

const sendMessageAPI = {
	async send(message: ISendMessage, cancelToken: CancelToken, callback: (progress: number) => void){
		return client.post<ISendMessageResponse>('/messages', message, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			cancelToken: cancelToken,
			onUploadProgress: progressEvent => {
				callback(progressEvent.loaded/progressEvent.total);
			}
		});
	}
};

export default sendMessageAPI;
