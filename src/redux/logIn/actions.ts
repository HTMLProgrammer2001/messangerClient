import {LOGIN_SUCCESS, LOGIN_RESET, LOGIN_VERIFY, LOGIN_CODE_VERIFY, LOGIN_ERROR, LOGIN_RESEND} from './types';
import {ILogInFormData} from '../../components/LogInPage/LogInForm';
import {IErrors} from '../../interfaces/IErrors';


export const logInSuccess = () => <const>({
	type: LOGIN_SUCCESS
});

export const logInReset = () => <const>({
	type: LOGIN_RESET
});

export const loginError = (errors: IErrors<ILogInFormData>) => <const>({
	type: LOGIN_ERROR,
	errors
});

export const logInVerify = (data: ILogInFormData) => <const>({
	type: LOGIN_VERIFY,
	payload: data
});

export const logInCodeVerify = (data: ILogInFormData) => <const>({
	type: LOGIN_CODE_VERIFY,
	payload: data
});

export const loginResend = (data: ILogInFormData) => <const>({
	type: LOGIN_RESEND,
	payload: data
});
