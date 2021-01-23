import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IErrors} from '../../interfaces/IErrors';
import {ILogInFormData} from '../../components/pages/LogInPage/LogInForm';
import {RootState} from '../index';


//reducer state type
type ILogInState = {
	verifing: boolean,
	errors: IErrors<ILogInFormData>,
	isLoading: boolean
};

export const initialState: ILogInState = {
	verifing: false,
	errors: null,
	isLoading: false
};

const logInSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		success(state, action: PayloadAction<null>){
			return {verifing: true, isLoading: false, errors: null};
		},
		error(state, action: PayloadAction<IErrors<ILogInFormData>>){
			state.errors = action.payload;
			state.isLoading = false;
		},
		reset(state, action: PayloadAction<null>){
			return {...initialState};
		},
		verify(state, action: PayloadAction<ILogInFormData>){
			state.isLoading = true;
		},
		codeVerify(state, action: PayloadAction<ILogInFormData>){
			state.isLoading = true;
		},
		resend(state, action: PayloadAction<ILogInFormData>){}
	}
});

//selectors
export const selectLogInState = (state: RootState) => state.logIn;

//exports
export const {
	verify: logInVerify, codeVerify: logInCodeVerify, resend: logInResend,
	error: logInError, success: logInSuccess, reset: logInReset
} = logInSlice.actions;

export default logInSlice.reducer;
