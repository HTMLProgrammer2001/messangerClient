import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IDialog} from '../interfaces/IDialog';
import {RootState} from './';


//state
type IDialogsState = Record<string, IDialog>
const initialState: IDialogsState = {};

//create slice
const dialogsSlice = createSlice({
	name: 'dialogs',
	initialState,
	reducers: {
		dialogsAdd(state, action: PayloadAction<IDialog>){
			const id = action.payload._id,
				cur = state[id] || {};

			state[id] = {...cur, ...action.payload};
		},
		dialogsAddMany(state, action: PayloadAction<IDialog[]>){
			if(!action.payload)
				return;

			action.payload.forEach(dialog => {
				const id = dialog._id,
					cur = state[id] || {};

				state[id] = {...cur, ...dialog};
			});
		},
		dialogsDelete(state, action: PayloadAction<string>){
			delete state[action.payload];
		},
		dialogsClear(state, action: PayloadAction<null>){
			return {};
		}
	}
});

//selectors
export const selectDialogs = (state: RootState) => state.dialogs;

//exports
export const {dialogsAdd, dialogsClear, dialogsDelete, dialogsAddMany} = dialogsSlice.actions;
export default dialogsSlice.reducer;
