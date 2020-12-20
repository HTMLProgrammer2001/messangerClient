import {CHANGE_SUCCESS, CHANGE_RESET, CHANGE_VERIFY, CHANGE_CODE_VERIFY, CHANGE_ERROR, CHANGE_RESEND} from './types';
import {IChangeFormData} from '../../components/ChangePhonePage/ChangeForm';
import {IErrors} from '../../interfaces/IErrors';


export const changeSuccess = () => <const>({
	type: CHANGE_SUCCESS
});

export const changeReset = () => <const>({
	type: CHANGE_RESET
});

export const changeError = (errors: IErrors<IChangeFormData>) => <const>({
	type: CHANGE_ERROR,
	errors
});

export const changeVerify = (data: IChangeFormData) => <const>({
	type: CHANGE_VERIFY,
	payload: data
});

export const changeCodeVerify = (data: IChangeFormData) => <const>({
	type: CHANGE_CODE_VERIFY,
	payload: data
});

export const changeResend = (data: {phone: string}) => <const>({
	type: CHANGE_RESEND,
	payload: data
});
