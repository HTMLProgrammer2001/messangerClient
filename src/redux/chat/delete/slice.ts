import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../index';


//initial state
type IChatDeleteState = {
	isLoading: boolean,
	wasError: boolean,
	messages: string[]
}

const initialState: IChatDeleteState = {
	isLoading: false,
	wasError: false,
	messages: []
};

//create slice
const chatDeleteSlice = createSlice({
	name: 'chat/delete',
	initialState,
	reducers: {
		start(state, action: PayloadAction<{messages: string[], other: boolean}>){
			state.isLoading = true;
			state.wasError = false;
			state.messages = action.payload.messages;
		},
		error(state, action: PayloadAction<null>){
			state.wasError = true;
			state.isLoading = false;
		},
		success(state, action: PayloadAction<null>){
			state.isLoading = false;
		}
	}
});

//selectors
export const selectChatDeleteState = (state: RootState) => state.chat.delete;

//exports
export const {
	start: chatDeleteStart,
	success: chatDeleteSuccess,
	error: chatDeleteError
} = chatDeleteSlice.actions;

export default chatDeleteSlice.reducer;
