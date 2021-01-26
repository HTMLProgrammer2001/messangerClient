import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {denormalize, schema} from 'normalizr';

import {RootState} from '../../';
import {IDialog} from '../../../interfaces/IDialog';
import {IMessage} from '../../../interfaces/IMessage';
import {IUser} from '../../../interfaces/IUser';

import {selectDialogs} from '../../dialogs';
import {selectMessages} from '../../messages';
import {selectUsers} from '../../users';


//create initial state
type ISearchDialogsState = {
	data: string[],
	isLoading: boolean,
	wasError: boolean,
	offset: number,
	total: number,
	totalPages: number
}

const initialState: ISearchDialogsState = {
	data: [],
	isLoading: false,
	wasError: false,
	offset: 0,
	total: 0,
	totalPages: 0
};

export type ISearchDialogsSuccessProps = {
	dialogs: string[],
	total: number,
	offset: number,
	totalPages: number
}

//create slice
const searchDialogsSlice = createSlice({
	name: 'search/dialogs',
	initialState,
	reducers: {
		startNick(state, action: PayloadAction<{nick: string, offset?: number}>){
			state.isLoading = true;
			state.wasError = false;
		},
		startName(state, action: PayloadAction<{name: string, offset?: number}>){
			state.isLoading = true;
			state.wasError = false;
		},
		error(state, action: PayloadAction<null>){
			state.wasError = true;
			state.isLoading = false;
		},
		success(state, action: PayloadAction<ISearchDialogsSuccessProps>){
			state.isLoading = false;
			state.data = state.data.concat(action.payload.dialogs);
			state.offset = action.payload.offset;
			state.total = action.payload.total;
			state.totalPages = action.payload.totalPages;
		},
		clear(state, action: PayloadAction<null>){
			return {...initialState};
		},
		add(state, action: PayloadAction<string>){
			state.data = [action.payload, ...state.data];
		}
	}
});

//selectors
const denormalizeDialogs = (dialogsIds: string[], entities: {
	dialogs: Record<string, IDialog>,
	messages: Record<string, IMessage>,
	users: Record<string, IUser>
}) => {
	const user = new schema.Entity('users', {}, {idAttribute: '_id'}),
		message = new schema.Entity('messages', {author: user}, {idAttribute: '_id'}),
		dialog = new schema.Entity('dialogs', {lastMessage: message}, {idAttribute: '_id'});

	return denormalize(dialogsIds, [dialog], entities);
};

export const selectSearchDialogsState = (state: RootState) => state.search.dialogs;
export const selectSearchDialogsStateData = (state: RootState) => (
	denormalizeDialogs(selectSearchDialogsState(state).data, {
		users: selectUsers(state),
		messages: selectMessages(state),
		dialogs: selectDialogs(state)
	})
);

//exports
export const {
	startName: searchDialogsStartName, startNick: searchDialogsStartNick, add: searchDialogsAdd,
	error: searchDialogsError, success: searchDialogsSuccess, clear: searchDialogsClear
} = searchDialogsSlice.actions;

export default searchDialogsSlice.reducer;
