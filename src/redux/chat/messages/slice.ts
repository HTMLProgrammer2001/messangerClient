import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../index';


//create initial state
type IChatMessagesState = {
	messages: string[],
	isLoading: boolean,
	error: string,
	offset: number,
	totalPages: number
}

const initialState: IChatMessagesState = {
	messages: [],
	isLoading: false,
	error: null,
	offset: 0,
	totalPages: 0
};

//create chat messages slice
const chatMessageSlice =  createSlice({
	name: 'chat/messages',
	initialState,
	reducers: {
		start(state, action: PayloadAction<number>) {
			state.isLoading = true;
			state.error = null;
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.error = action.payload;
		},
		success(state, action: PayloadAction<string[]>){
			state.isLoading = false;
			state.messages = state.messages.concat(action.payload);
		},
		clear(state, action: PayloadAction<null>){
			return {...initialState};
		}
	}
});

//selectors
export const selectChatMessagesState = (state: RootState) => state.chat.messages;

//exports
export const {
	start: chatMessagesStart, error: chatMessagesError,
	success: chatMessagesSuccess, clear: chatMessagesClear
} = chatMessageSlice.actions;

export default chatMessageSlice.reducer;
