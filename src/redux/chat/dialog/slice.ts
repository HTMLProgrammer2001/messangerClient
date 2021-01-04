import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../';
import {IDialog} from '../../../interfaces/IDialog';
import {IUser} from '../../../interfaces/IUser';

import {selectDialogs} from '../../dialogs';
import {selectUsers} from '../../users';
import mapIdWith from '../../../utils/helpers/mapIdWith';


//create initial state
type IChatDialogState = {
	nick: string,
	dialog: string,
	isLoading: boolean,
	wasError: boolean,
	user: string
}

const initialState: IChatDialogState = {
	nick: null,
	dialog: null,
	user: null,
	isLoading: false,
	wasError: false
};

//create slice
const chatDialogSlice = createSlice({
	name: 'chat/dialog',
	initialState,
	reducers: {
		start(state, action: PayloadAction<null>) {
			return {...initialState, isLoading: true};
		},
		error(state, action: PayloadAction<null>) {
			state.isLoading = false;
			state.wasError = true;
		},
		setDialog(state, action: PayloadAction<{ nick: string, id: string }>) {
			state.isLoading = false;
			state.nick = action.payload.nick;
			state.dialog = action.payload.id;
		},
		setUser(state, action: PayloadAction<{ nick: string, id: string }>) {
			state.user = action.payload.id;
			state.nick = action.payload.nick;
		}
	}
});

//selectors
export const selectChatDialogState = (state: RootState) => state.chat.dialog;
export const selectChatUser = (state: RootState) => (
	mapIdWith(selectChatDialogState(state).user, selectUsers(state)) as IUser
);

export const selectChatDialog = (state: RootState) => (
	mapIdWith(selectChatDialogState(state).dialog, selectDialogs(state)) as IDialog
);

//exports
export const {
	start: chatDialogStart, error: chatDialogError, setDialog: chatSetDialog, setUser: chatSetUser
} = chatDialogSlice.actions;

export default chatDialogSlice.reducer;
