import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IUser} from '../../../interfaces/IUser';
import {RootState} from '../../index';
import mapIdWith from '../../../utils/helpers/mapIdWith';
import {selectUsers} from '../../users';


//initial state
type ISearchUserState = {
	user: string,
	isLoading: boolean,
	wasError: boolean
}

const initialState: ISearchUserState = {
	user: null,
	isLoading: false,
	wasError: false
};

//create slice
const searchUserSlice = createSlice({
	name: 'search/users',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){
			state.isLoading = true;
			state.wasError = false;
		},
		error(state, action: PayloadAction<null>){
			state.wasError = true;
			state.isLoading = false;
		},
		success(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.user = action.payload;
		},
		clear(state, action: PayloadAction<null>){
			return {...initialState};
		}
	}
});

//selectors
export const selectSearchUsersState = (state: RootState) => state.search.user;
export const selectSearchUsersData = (state: RootState) => (
	mapIdWith<IUser>(selectSearchUsersState(state).user, selectUsers(state)) as IUser
);

//exports
export const {
	start: searchUserStart, error: searchUserError,
	success: searchUserSuccess, clear: searchUserClear
} = searchUserSlice.actions;

export default searchUserSlice.reducer;
