import axios, {CancelToken, CancelTokenSource} from 'axios';

import {ISendMessage} from '../../redux/sendMessage/slice';
import {ISendMessageResponse} from '../../interfaces/Responses/chat/ISendMessageResponse';


const client = axios.create({
	baseURL: process.env.API_URL || 'http://localhost:5000'
});

const sendMessageAPI = {
	async send(message: ISendMessage, cancelToken: CancelToken, callback: (progress: number) => void){
		//create form data
		let form = new FormData();
		form.append('message', message.message);
		form.append('type', message.type.toString());
		form.append('dialog', message.dialog._id);
		form.append('file', message.file);

		return client.post<ISendMessageResponse>('/messages', form, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
			cancelToken: cancelToken,
			onUploadProgress: progressEvent => {
				callback(progressEvent.loaded/progressEvent.total);
			}
		});
	}
};

export default sendMessageAPI;
