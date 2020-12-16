import axios, {AxiosResponse} from 'axios';

import {ISignInFormData} from '../../components/SingInPage/SignInForm';
import {ILogInFormData} from '../../components/LogInPage/LogInForm';
import {IUser} from '../../interfaces/IUser';
import {ILoginResponse} from '../../interfaces/Responses/ILoginResponse';


const client = axios.create({
	baseURL: 'http://localhost:5000/',
	headers: {
		'Access-Controll-Allow-Origin': '*'
	}
});

const authAPI = {
	signIn(values: ISignInFormData){
		return client.post<{}>('/signin', values);
	},
	confirmSignin(values: ISignInFormData){
		return client.post<{}>('signin/confirm', values);
	},

	logIn(values: ILogInFormData){
		return client.post<{}>('/login', values);
	},
	confirmLogin(values: ILogInFormData){
		return client.post<ILoginResponse>('/confirm/login', values);
	},
	resendLogin(values: ILogInFormData){
		return client.post<IUser>('/resend', {phone: values.phone, type: 2});
	},

	getMe(token: string){
		return client.get<{}>('/me', {
			headers: {Authorization: `Bearer ${token}`}
		})
	}
};

export default authAPI;
