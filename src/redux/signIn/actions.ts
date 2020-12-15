import {SIGNIN_SUCCESS, SIGNIN_RESET, SIGNIN_VERIFY, SIGNIN_CODE_VERIFY} from './types';


export const signInSuccess = () => <const>({
	type: SIGNIN_SUCCESS
});

export const signInReset = () => <const>({
	type: SIGNIN_RESET
});

export const signInVerify = () => <const>({
	type: SIGNIN_VERIFY
});

export const signInCodeVerify = () => <const>({
	type: SIGNIN_CODE_VERIFY
});
