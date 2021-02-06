import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../index';


//initial state
type IResendState = {
	isLoading: boolean
}

const initialState: IResendState = {
	isLoading: false
};

//create slice
const resendSlice = createSlice({
	name: 'resend/state',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string[]>){
			state.isLoading = true;
		},
		error(state, action: PayloadAction<null>){
			state.isLoading = false;
		},
		success(state, action: PayloadAction<null>){
			state.isLoading = false;
		}
	}
});

//selectors
export const selectResendState = (state: RootState) => state.resend.state;

//exports
export const {start: resendStart, success: resendSuccess, error: resendError} = resendSlice.actions;
export default resendSlice.reducer;
