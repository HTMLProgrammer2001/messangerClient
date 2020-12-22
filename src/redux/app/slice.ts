import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';


type IAppState = {
	initialized: boolean,
	isLoading: boolean
};

const initialState: IAppState = {
	initialized: false,
	isLoading: false
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		start(state, action: PayloadAction<null>){
			state.isLoading = true;
			state.initialized = false;
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.initialized = true;
		},
		success(state, action: PayloadAction<null>){
			state.isLoading = false;
			state.initialized = true;
		}
	}
});

export const selectAppState = (state: RootState) => state.app;

export const {start: appStart, error: appError, success: appSuccess} = appSlice.actions;
export default appSlice.reducer;
