import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IErrors} from '../../interfaces/IErrors';
import {IChangeFormData} from '../../components/ChangePhonePage/ChangeForm';
import {RootState} from '../index';


//reducer state type
type IChangeState = {
	verifing: boolean,
	errors: IErrors<IChangeFormData>,
	isLoading: boolean
};

const initialState: IChangeState = {
	verifing: false,
	errors: null,
	isLoading: false
};

const changeSlice = createSlice({
	name: 'change',
	initialState,
	reducers: {
		success(state, action: PayloadAction<null>){
			return {verifing: true, errors: null, isLoading: false};
		},
		error(state, action: PayloadAction<IErrors<IChangeFormData>>){
			state.errors = action.payload;
			state.isLoading = false;
		},
		reset(state, action: PayloadAction<null>){
			return {...initialState};
		},
		verify(state, action: PayloadAction<IChangeFormData>){
			state.isLoading = true;
		},
		codeVerify(state, action: PayloadAction<IChangeFormData>){
			state.isLoading = true;
		},
		resend(state, action: PayloadAction<{phone: string}>){}
	}
});

//selectors
export const selectChangeState = (state: RootState) => state.change;

//exports
export const {
	success: changeSuccess, error: changeError,
	reset: changeReset, verify: changeVerify,
	codeVerify: changeCodeVerify, resend: changeResend
} = changeSlice.actions;

export default changeSlice.reducer;
