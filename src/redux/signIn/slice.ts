import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IErrors} from '../../interfaces/IErrors';
import {ISignInFormData} from '../../components/pages/SingInPage/SignInForm';
import {RootState} from '../index';


//reducer state type
type ISignInState = {
	verifing: boolean,
	errors: IErrors<ISignInFormData>,
	isLoading: boolean
};

const initialState: ISignInState = {
	verifing: false,
	errors: null,
	isLoading: false
};

const signInSlice = createSlice({
	name: 'signin',
	initialState,
	reducers: {
		success(state, action: PayloadAction<null>){
			return {verifing: true, isLoading: false, errors: null};
		},
		error(state, action: PayloadAction<IErrors<ISignInFormData>>){
			state.errors = action.payload;
			state.isLoading = false;
		},
		reset(state, action: PayloadAction<null>){
			return {...initialState};
		},
		verify(state, action: PayloadAction<ISignInFormData>){
			state.isLoading = true;
		},
		codeVerify(state, action: PayloadAction<ISignInFormData>){
			state.isLoading = true;
		},
		resend(state, action: PayloadAction<ISignInFormData>){}
	}
});

//selectors
export const selectSignInState = (state: RootState) => state.signIn;

//exports
export const {
	verify: signInVerify, codeVerify: signInCodeVerify, resend: signInResend,
	error: signInError, success: signInSuccess, reset: signInReset
} = signInSlice.actions;

export default signInSlice.reducer;
