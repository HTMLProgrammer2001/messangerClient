import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {denormalize, schema} from 'normalizr';

import {IMessage} from '../../../interfaces/IMessage';
import {RootState} from '../../';
import {IUser} from '../../../interfaces/IUser';
import {IDialog} from '../../../interfaces/IDialog';

import {selectMessages} from '../../messages';
import {selectDialogs} from '../../dialogs';
import {selectUsers} from '../../users';


//create state
type ISearchMessagesState = {
	data: string[],
	isLoading: boolean,
	wasError: boolean,
	offset: number,
	total: number,
	totalPages: number
}

const initialState: ISearchMessagesState = {
	data: [],
	isLoading: false,
	wasError: false,
	offset: 0,
	total: 0,
	totalPages: 0
};

export type ISearchMessagesSuccessProps = {
	messages: string[],
	total: number,
	totalPages: number,
	offset: number
}

//create slice
const searchMessagesSlice = createSlice({
	name: 'search/messages',
	initialState,
	reducers: {
		start(state, action: PayloadAction<{text: string, offset?: number}>){
			state.isLoading = true;
			state.wasError = false;
		},
		error(state, action: PayloadAction<null>){
			state.isLoading = false;
			state.wasError = true;
		},
		success(state, action: PayloadAction<ISearchMessagesSuccessProps>){
			state.isLoading = false;
			state.data = state.data.concat(action.payload.messages);
			state.total = action.payload.total;
			state.offset = action.payload.offset;
			state.totalPages = action.payload.totalPages;
		},
		clear(state, action: PayloadAction<null>){
			return {...initialState};
		}
	}
});

//selectors
export const selectSearchMessagesState = (state: RootState) => state.search.messages;

const denormalizeMessages = (messagesIds: string[], entities: {
	messages: Record<string, IMessage>,
	users: Record<string, IUser>,
	dialogs: Record<string, IDialog>
}) => {
	const users = new schema.Entity('users', {}, {idAttribute: '_id'}),
		dialogs = new schema.Entity('dialogs', {}, {idAttribute: '_id'}),
		messages = new schema.Entity('messages', {author: users, dialog: dialogs}, {idAttribute: '_id'});

	return denormalize(messagesIds, [messages], entities);
};

export const selectSearchMessagesStateData = (state: RootState) => (
	denormalizeMessages(selectSearchMessagesState(state).data, {
		messages: selectMessages(state),
		dialogs: selectDialogs(state),
		users: selectUsers(state)
	})
);

//exports
export const {
	start: searchMessagesStart, error: searchMessagesError,
	success: searchMessagesSuccess, clear: searchMessagesClear
} = searchMessagesSlice.actions;

export default searchMessagesSlice.reducer;
