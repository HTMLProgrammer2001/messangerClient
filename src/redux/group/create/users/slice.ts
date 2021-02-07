import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../../';
import {IUser} from '../../../../interfaces/IUser';

import mapIdWith from '../../../../utils/helpers/mapIdWith';
import {selectUsers} from '../../../users';


//initial state
type ICreateGroupDialogsState = {
	isLoading: boolean,
	error: string,
	users: string[],
	offset: number,
	hasMore: boolean,
	text: string
}

const initialState: ICreateGroupDialogsState = {
	isLoading: false,
	error: null,
	users: [],
	offset: 0,
	hasMore: false,
	text: ''
};

//create slice
const createGroupDialogsSlice = createSlice({
	name: 'group/create',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){
			return {...initialState, isLoading: true, text: action.payload};
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.error = action.payload;
		},
		success(state, action: PayloadAction<{users: string[], hasMore: boolean, offset: number}>){
			state.users = state.users.concat(action.payload.users);
			state.hasMore = action.payload.hasMore;
			state.offset = action.payload.offset;
			state.isLoading = false;
		},
		more(state, action: PayloadAction<null>){
			state.isLoading = true;
		}
	}
});

//selectors
export const selectGroupCreateUsersState = (state: RootState) => state.group.create.users;
export const selectCreateGroupUsers = (state: RootState) =>
	mapIdWith(state.group.create.users.users, selectUsers(state)) as IUser[];

//exports
export const {
	start: createGroupUsersStart,
	success: createGroupUsersSuccess,
	error: createGroupUsersError, more: createGroupUsersMore} = createGroupDialogsSlice.actions;

export default createGroupDialogsSlice.reducer;
