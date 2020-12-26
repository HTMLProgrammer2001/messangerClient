import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IUser} from '../interfaces/IUser';
import {RootState} from './';


//initial state
type IUserState = Record<string, IUser>;
const initialState: IUserState = {};

//create slice
const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		usersAdd(state, action: PayloadAction<IUser>){
			const id = action.payload._id,
				cur = state[id] || {};

			//add user or change
			state[id] = {...cur, ...action.payload};
		},
		usersAddMany(state, action: PayloadAction<IUser[]>){
			//add all users from array
			action.payload.forEach(user => {
				const id = user._id,
					cur = state[id] || {};

				//add user or change
				state[id] = {...cur, ...user};
			});
		},
		usersDelete(state, action: PayloadAction<string>){
			delete state[action.payload];
		},
		usersClear(state, action: PayloadAction<null>){
			return {};
		}
	}
});

//selectors
export const selectUsers = (state: RootState) => state.users;

//exports
export const {usersAdd, usersAddMany, usersClear, usersDelete} = userSlice.actions;
export default userSlice.reducer;
