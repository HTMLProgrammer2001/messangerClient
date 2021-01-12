import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../index';
import {IMessage} from '../../interfaces/IMessage';


//create initial state
export type ISendMessage = {file?: File} & IMessage

type ISendMessageItem = {
	progress: number,
	msg: ISendMessage
};

type ISendMessageState = Record<string, ISendMessageItem>;

const initialState: ISendMessageState = {};

//create slice
const sendMessageSlice = createSlice({
	name: 'sendMessage',
	initialState,
	reducers: {
		start(state, action: PayloadAction<ISendMessage>){
			state[action.payload._id] = {
				progress: 0,
				msg: action.payload
			};
		},
		success(state, action: PayloadAction<string>){
			delete state[action.payload];
		},
		progress(state, action: PayloadAction<{message: string, progress: number}>){
			state[action.payload.message].progress = action.payload.progress;
		},
		cancel(state, action: PayloadAction<string>){
			delete state[action.payload];
		}
	}
});

//selectors
export const selectSendMessageState = (state: RootState) => state.sendMessage;
export const selectSendMessage = (id: string) => (state: RootState) => selectSendMessageState(state)[id];
export const selectSendMessagesForDialog = (id: string) =>
	(state: RootState) => Object.values(selectSendMessageState(state)).filter(it => it.msg.dialog._id == id);

//exports
export const {
	start: sendMessageStart, success: sendMessageSuccess,
	progress: sendMessageProgress, cancel: sendMessageCancel
} = sendMessageSlice.actions;

export default sendMessageSlice.reducer;
