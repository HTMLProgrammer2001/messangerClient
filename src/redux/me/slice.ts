import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IUser} from '../../interfaces/IUser';
import {RootState} from '../index';


type IMeState = {
	isLoading: boolean,
	user: IUser
};

const initialState: IMeState = {
	isLoading: false,
	user: null
};

const meSlice = createSlice({
	name: 'me',
	initialState,
	reducers: {
		start(state, action: PayloadAction<null>){
			state.isLoading = true;
			state.user = null;
		},
		set(state, action: PayloadAction<IUser>){
			state.isLoading = false;
			state.user = action.payload;
		},
		reset(state, action: PayloadAction<null>){
			state.isLoading = false;
			state.user = null;
		}
	}
});

export const selectMeState = (state: RootState) => state.me;
export const selectMeInfo = createSelector([selectMeState], (meState) => meState.user);

export const {set: meSet, reset: meReset, start: meStart} = meSlice.actions;
export default meSlice.reducer;
