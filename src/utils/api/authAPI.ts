import axios from 'axios';

import {ISignInFormData} from '../../components/SingInPage/SignInForm';
import {ILogInFormData} from '../../components/LogInPage/LogInForm';
import {IUser} from '../../interfaces/IUser';
import {ILoginResponse} from '../../interfaces/Responses/ILoginResponse';
import {ISignInResponse} from '../../interfaces/Responses/ISignInResponse';


const client = axios.create({
	baseURL: 'http://localhost:5000/',
	headers: {
		'Access-Controll-Allow-Origin': '*'
	}
});

const authAPI = {
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

	getMe(token: string){
		return client.get<IUser>('/me', {
			headers: {Authorization: `Bearer ${token}`}
		})
	},
	logout(token: string){
		return client.post<{message: string}>('/logout', null,{
			headers: {Authorization: `Bearer ${token}`}
		})
	}
};

export default authAPI;
