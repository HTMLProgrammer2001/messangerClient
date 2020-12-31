import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';


//create initial state
type IChatState = {
	dialogID: string,
	isLoading: boolean,
	error: string,
	messages: string[],
	offset: number,
	totalPages: number
}

const initialState: IChatState = {
	dialogID: null,
	isLoading: false,
	error: null,
	messages: [],
	offset: 0,
	totalPages: 0
};

//create slice
const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){
			state.isLoading = true;
			state.error = null;
			state.messages = [];
			state.offset = 0;
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.error = action.payload;
		},
		success(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.dialogID = action.payload;
		},
		startMessages(state, action: PayloadAction<null>){
			state.isLoading = true;
		}
	}
});

//selectors
export const selectChatState = (state: RootState) => state.chat;

//exports
export default chatSlice.reducer;
