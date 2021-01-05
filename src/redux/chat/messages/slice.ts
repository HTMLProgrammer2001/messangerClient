import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {denormalize, schema} from 'normalizr';

import {RootState} from '../../';
import {IMessage} from '../../../interfaces/IMessage';
import {IUser} from '../../../interfaces/IUser';
import {IDialog} from '../../../interfaces/IDialog';

import {selectMessages} from '../../messages';
import {selectUsers} from '../../users';
import {selectDialogs} from '../../dialogs';


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
		start(state, action: PayloadAction<null>) {
			state.isLoading = true;
			state.error = null;
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.error = action.payload;
		},
		success(state, action: PayloadAction<{data: string[], offset: number, totalPages: number}>){
			state.isLoading = false;
			state.messages = state.messages.concat(action.payload.data);
			state.totalPages = action.payload.totalPages;
			state.offset = action.payload.offset;
		},
		clear(state, action: PayloadAction<null>){
			return {...initialState};
		}
	}
});

//selectors
export const selectChatMessagesState = (state: RootState) => state.chat.messages;

const denormalizeMessage = (messageIds: string[], entities: {
	users: Record<string, IUser>,
	messages: Record<string, IMessage>,
	dialogs: Record<string, IDialog>
}) => {
	const author = new schema.Entity('users', {}, {idAttribute: '_id'}),
		dialog = new schema.Entity('dialogs', {}, {idAttribute: '_id'}),
		message = new schema.Entity('messages', {dialog, author}, {idAttribute: '_id'});

	return denormalize(messageIds, [message], entities);
};

export const selectChatMessages = (state: RootState) => (
	denormalizeMessage(selectChatMessagesState(state).messages, {
		users: selectUsers(state),
		messages: selectMessages(state),
		dialogs: selectDialogs(state)
	})
);

//exports
export const {
	start: chatMessagesStart, error: chatMessagesError,
	success: chatMessagesSuccess, clear: chatMessagesClear
} = chatMessageSlice.actions;

export default chatMessageSlice.reducer;
