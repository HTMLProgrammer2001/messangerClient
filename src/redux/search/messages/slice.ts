import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IMessage} from '../../../interfaces/IMessage';
import {RootState} from '../../index';
import mapIdWith from '../../../utils/helpers/mapIdWith';
import {selectMessages} from '../../messages';


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
export const selectSearchMessagesStateData = (state: RootState) => (
	mapIdWith<IMessage>(selectSearchMessagesState(state).data, selectMessages(state)) as IMessage[]
);

//exports
export const {
	start: searchMessagesStart, error: searchMessagesError,
	success: searchMessagesSuccess, clear: searchMessagesClear
} = searchMessagesSlice.actions;

export default searchMessagesSlice.reducer;
