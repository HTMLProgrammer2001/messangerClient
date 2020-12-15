import axios from 'axios';

import {ISignInFormData} from '../components/SingInPage/SignInForm';
import {ILogInFormData} from '../components/LogInPage/LogInForm';


const client = axios.create({
	baseURL: 'localhost:3000/api/auth'
});


const authAPI = {
	signIn(values: ISignInFormData){
		return axios.post<{}>('/signin', values);
	},
	confirmSignin(values: ISignInFormData){
		return axios.post<{}>('signin/confirm', values);
	},

	logIn(values: ILogInFormData){
		return axios.post<{}>('/login', values);
	},
	confirmLogin(values: ILogInFormData){
		return axios.post<{}>('/login/confirm', values);
	}
};

export default authAPI;
