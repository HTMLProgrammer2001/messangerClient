import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../index';


//create initial state
type IClearState = {
	isLoading: boolean,
	error: string
}

export const initialState: IClearState = {
	isLoading: false,
	error: null
};

const clearSlice = createSlice({
	name: 'clear',
	initialState,
	reducers: {
		start(state, action: PayloadAction<{id: string, type: number}>){
			state.isLoading = true;
			state.error = null;
		},
		error(state, action: PayloadAction<string>){
			state.error = action.payload;
			state.isLoading = false;
		},
		success(state, action: PayloadAction<null>){
			state.isLoading = false;
		}
	}
});

//selectors
export const selectClearState = (state: RootState) => state.clear;

//exports
export const {start: clearStart, error: clearError, success: clearSuccess} = clearSlice.actions;
export default clearSlice.reducer;
