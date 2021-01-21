import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../';
import {IUser} from '../../interfaces/IUser';
import mapIdWith from '../../utils/helpers/mapIdWith';
import {selectUsers} from '../users';


type IMeState = {
	isLoading: boolean,
	user: string
};

export const initialState: IMeState = {
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
		set(state, action: PayloadAction<string>){
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
export const selectMeInfo = (state: RootState) => mapIdWith<IUser>(selectMeState(state).user, selectUsers(state)) as IUser;

export const {set: meSet, reset: meReset, start: meStart} = meSlice.actions;
export default meSlice.reducer;
