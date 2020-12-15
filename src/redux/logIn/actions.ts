import {LOGIN_SUCCESS, LOGIN_RESET, LOGIN_VERIFY, LOGIN_CODE_VERIFY} from './types';


export const logInSuccess = () => <const>({
	type: LOGIN_SUCCESS
});

export const logInReset = () => <const>({
	type: LOGIN_RESET
});

export const logInVerify = () => <const>({
	type: LOGIN_VERIFY
});

export const logInCodeVerify = () => <const>({
	type: LOGIN_CODE_VERIFY
});
