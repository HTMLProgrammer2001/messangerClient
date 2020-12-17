import {SIGNIN_SUCCESS, SIGNIN_RESET, SIGNIN_VERIFY, SIGNIN_CODE_VERIFY, SIGNIN_ERROR, SIGNIN_RESEND} from './types';
import {ISignInFormData} from '../../components/SingInPage/SignInForm';
import {IErrors} from '../../interfaces/IErrors';


export const signInSuccess = () => <const>({
	type: SIGNIN_SUCCESS
});

export const signInError = (errors: IErrors<ISignInFormData>) => <const>({
	type: SIGNIN_ERROR,
	payload: errors
});

export const signInReset = () => <const>({
	type: SIGNIN_RESET
});

export const signInVerify = (vals: ISignInFormData) => <const>({
	type: SIGNIN_VERIFY,
	payload: vals
});

export const signInCodeVerify = (vals: ISignInFormData) => <const>({
	type: SIGNIN_CODE_VERIFY,
	payload: vals
});

export const signInResend = (vals: ISignInFormData) => <const>({
	type: SIGNIN_RESEND,
	payload: vals
});
