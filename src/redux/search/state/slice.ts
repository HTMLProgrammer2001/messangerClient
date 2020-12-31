import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';

import {RootState} from '../../index';
import {SearchTypes} from '../../../constants/SearchTypes';

import {selectSearchUsersState} from '../users/slice';
import {selectSearchDialogsState} from '../dialogs/slice';
import {selectSearchMessagesState} from '../messages/slice';


//create initial state
type ISearchState = {
	current: string | null,
	type: SearchTypes,
	text: string,
	isLoading: boolean,
	wasError: boolean
}

const initialState: ISearchState = {
	current: null,
	type: SearchTypes.NICK,
	text: '',
	isLoading: false,
	wasError: false
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){
			state.isLoading = true;
			state.wasError = false;
		},
		error(state, action: PayloadAction<null>){
			state.isLoading = false;
			state.wasError = true;
		},
		success(state, action: PayloadAction<null>){
			state.isLoading = false;
		},
		clear(state, action: PayloadAction<null>){
			return {...initialState};
		},
		setText(state, action: PayloadAction<{type: SearchTypes, text: string}>){
			state.type = action.payload.type;
			state.text = action.payload.text;
		},
		setCurrent(state, action: PayloadAction<string>){
			state.current = action.payload;
		}
	}
});

//selectors
export const selectSearchState = (state: RootState) => state.search.state;
export const selectSearchType = (state: RootState) => selectSearchState(state).type;
export const selectSearchText = (state: RootState) => selectSearchState(state).text;
export const selectSearchCurrent = (state: RootState) => selectSearchState(state).current;

export const selectSearchHasData = createSelector(
	selectSearchUsersState, selectSearchDialogsState, selectSearchMessagesState,
	({user}, dialogs, messages) => user || dialogs.data.length || messages.data.length
);

//exports
export const {
	clear: searchClear, setText: searchSetText, start: searchStart,
	success: searchSuccess, error: searchError, setCurrent: searchSetCurrent
} = searchSlice.actions;

export default searchSlice.reducer;
