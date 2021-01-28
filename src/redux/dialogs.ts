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
		dialogAddCount(state, action: PayloadAction<{dialog: string, count: number}>){
			const dlg = state[action.payload.dialog];

			if(dlg)
				dlg.unread = dlg.unread + action.payload.count;
		},
		dialogsAdd(state, action: PayloadAction<IDialog>){
			const id = action.payload._id,
				cur = state[id] || {};

			state[id] = {...cur, ...action.payload};
		},
		dialogsAddMany(state, action: PayloadAction<Record<string, IDialog>>){
			if(!action.payload)
				return;

			for(let id in action.payload){
				let cur = state[id] || {};

				//set dialog or change
				state[id] = {...cur, ...action.payload[id]};
			}
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
export const {dialogsAdd, dialogsClear, dialogsDelete, dialogsAddMany, dialogAddCount} = dialogsSlice.actions;
export default dialogsSlice.reducer;
