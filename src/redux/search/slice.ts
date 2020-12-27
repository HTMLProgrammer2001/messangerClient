import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';

import {RootState} from '../';
import {SearchTypes} from '../../constants/SearchTypes';
import mapIdWith from '../../utils/helpers/mapIdWith';
import {selectUsers} from '../users';
import {selectDialogs} from '../dialogs';


//create initial state
type ISearchState = {
	current: string,
	isLoading: boolean,
	wasError: boolean,
	type: SearchTypes,
	text: string,
	user?: string,
	offset: number,
	messages: Array<string>,
	dialogs: Array<string>
}

const initialState: ISearchState = {
	current: null,
	isLoading: false,
	wasError: false,
	type: SearchTypes.NICK,
	text: '',
	user: null,
	offset: 0,
	messages: [],
	dialogs: []
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){
			state.isLoading = true;
			state.wasError = false;

			state.user = null;
			state.messages = [];
			state.dialogs = [];
		},
		error(state, action: PayloadAction<null>){
			state.wasError = true;
			state.isLoading = false;
		},
		success(state, action: PayloadAction<null>){
			state.wasError = false;
			state.isLoading = false;
		},
		clear(state, action: PayloadAction<null>){
			return {...initialState};
		},
		setText(state, action: PayloadAction<{type: SearchTypes, text: string}>){
			state.type = action.payload.type;
			state.text = action.payload.text;
		},
		setUser(state, action: PayloadAction<string>){
			state.user = action.payload;
		},
		addDialogs(state, action: PayloadAction<string[]>){
			state.dialogs = state.dialogs.concat(action.payload);
		},
		clearDialogs(state, action: PayloadAction<null>){
			state.dialogs = [];
		},
		addMessages(state, action: PayloadAction<string[]>){
			state.messages = state.messages.concat(action.payload);
		},
		clearMessages(state, action: PayloadAction<null>){
			state.messages = [];
		},
		setCurrent(state, action: PayloadAction<string>){
			state.current = action.payload;
		}
	}
});

//selectors
export const selectSearchState = (state: RootState) => state.search;
export const selectSearchType = (state: RootState) => selectSearchState(state).type;
export const selectSearchText = (state: RootState) => selectSearchState(state).text;
export const selectSearchCurrent = (state: RootState) => selectSearchState(state).current;

export const selectSearchUser = (state: RootState) => {
	return mapIdWith(selectSearchState(state).user, selectUsers(state));
};

export const selectSearchDialogs = (state: RootState) => {
	return mapIdWith(selectSearchState(state).dialogs, selectDialogs(state));
};

export const selectSearchMessages = (state: RootState) => {
	return mapIdWith(selectSearchState(state).messages, {});
};

export const selectSearchHasData = createSelector(selectSearchState, (search) => {
	return search.user || search.dialogs.length || search.messages.length;
});

//exports
export const {
	clear: searchClear, setText: searchSetText, setUser: searchSetUser,
	addDialogs: searchAddDialogs, addMessages: searchAddMessages,
	start: searchStart, success: searchSuccess, error: searchError,
	setCurrent: searchSetCurrent, clearDialogs: searchClearDialogs, clearMessages: searchClearMessages
} = searchSlice.actions;

export default searchSlice.reducer;
