import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../';
import {IDialog} from '../../../interfaces/IDialog';

import {selectDialogs} from '../../dialogs';
import mapIdWith from '../../../utils/helpers/mapIdWith';


//create initial state
type IChatDialogState = {
	nick: string,
	id: string,
	isLoading: boolean,
	error: string
}

const initialState: IChatDialogState = {
	nick: null,
	id: null,
	isLoading: false,
	error: null
};

//create slice
const chatDialogSlice = createSlice({
	name: 'chat/dialog',
	initialState,
	reducers: {
		start(state, action: PayloadAction<null>){
			state.isLoading = true;
			state.error = null;
			state.nick = null;
			state.id = null;
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.error = action.payload;
		},
		success(state, action: PayloadAction<{nick: string, id: string}>){
			state.isLoading = false;
			state.nick = action.payload.nick;
			state.id = action.payload.id;
		}
	}
});

//selectors
export const selectChatDialogState = (state: RootState) => state.chat.dialog;
export const selectChatDialog = (state: RootState) => (
	mapIdWith(selectChatDialogState(state).id, selectDialogs(state)) as IDialog
);

//exports
export const {
	start: chatDialogStart, error: chatDialogError, success: chatDialogSuccess
} = chatDialogSlice.actions;

export default chatDialogSlice.reducer;
