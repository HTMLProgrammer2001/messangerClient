import axios from 'axios';

import {ISignInFormData} from '../../components/pages/SingInPage/SignInForm';
import {ILogInFormData} from '../../components/pages/LogInPage/LogInForm';
import {IUser} from '../../interfaces/IUser';
import {ILoginResponse} from '../../interfaces/Responses/ILoginResponse';
import {ISignInResponse} from '../../interfaces/Responses/ISignInResponse';
import {IEditMeResponse} from '../../interfaces/Responses/IEditMeResponse';
import {IChangeFormData} from '../../components/pages/ChangePhonePage/ChangeForm';


const client = axios.create({
	baseURL: process.env.API_URL || 'http://localhost:5000/',
	headers: {'Access-Controll-Allow-Origin': '*'}
});

const userActionsAPI = {
	signIn(values: ISignInFormData){
		return client.post<{}>('/sign', values);
	},
	confirmSignIn(values: ISignInFormData){
		return client.post<ISignInResponse>('confirm/sign', values);
	},
	resendSignIn(values: ISignInFormData){
		return client.post<{message: string}>('/resend', {phone: values.phone, type: 1});
	},

	logIn(values: ILogInFormData){
		return client.post<{}>('/login', values);
	},
	confirmLogin(values: ILogInFormData){
		return client.post<ILoginResponse>('/confirm/login', values);
	},
	resendLogin(values: ILogInFormData){
		return client.post<{message: string}>('/resend', {phone: values.phone, type: 2});
	},

	getMe(){
		return client.get<IUser>('/me', {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		})
	},
	logout(){
		return client.post<{message: string}>('/logout', null,{
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		})
	},

	editMe(vals: any){
		return client.post<IEditMeResponse>('/me', vals, {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		})
	},
	deleteAvatar(){
		return client.delete<IEditMeResponse>('/avatar', {
			headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
		});
	},

	changePhone(vals: IChangeFormData){
		return client.post<{}>('/changePhone', vals);
	},
	confirmChangePhone(vals: IChangeFormData){
		return client.post<{}>('/confirm/changePhone', vals);
	},
	resendChange({phone}: {phone: string}){
		return client.post<{message: string}>('/resend', {phone, type: 3});
	}
};

export default userActionsAPI;
