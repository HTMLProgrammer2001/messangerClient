import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../index';
import {ISendMessage} from '../../sendMessage/slice';
import {IMessage} from '../../../interfaces/IMessage';

import mapIdWith from '../../../utils/helpers/mapIdWith';
import {selectMessages} from '../../messages';


//initial state
type IChatEditState = {
	message: string,
	isLoading: boolean,
	error: string
}

const initialState: IChatEditState = {
	isLoading: false,
	message: null,
	error: null
};

//create slice
const chatEditSlice = createSlice({
	name: 'chat/edit',
	initialState,
	reducers: {
		setMessage(state, action: PayloadAction<string>){
			state.message = action.payload;
		},
		start(state, action: PayloadAction<{message: ISendMessage, id: string}>){
			state.isLoading = true;
			state.error = null;
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.error = action.payload;
		},
		success(state, action: PayloadAction<null>){
			state.isLoading = false;
			state.message = null;
		},
		clear(state, action: PayloadAction<null>){
			return {...initialState};
		}
	}
});

//selectors
export const selectChatEditState = (state: RootState) => state.chat.edit;
export const selectChatEditMessage = (state: RootState) => (
	mapIdWith(selectChatEditState(state).message, selectMessages(state)) as IMessage
);

//exports
export const {
	start: chatEditStart, error: chatEditError,
	success: chatEditSuccess, setMessage: chatEditSetMessage,
	clear: chatEditClear
} = chatEditSlice.actions;

export default chatEditSlice.reducer;
