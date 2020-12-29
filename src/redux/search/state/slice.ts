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
	text: string
}

const initialState: ISearchState = {
	current: null,
	type: SearchTypes.NICK,
	text: ''
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){},
		error(state, action: PayloadAction<null>){},
		success(state, action: PayloadAction<null>){},
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

export const selectSearchHasError = createSelector(
	selectSearchUsersState, selectSearchDialogsState, selectSearchMessagesState,
	(user, dialogs, messages) => user.wasError || dialogs.wasError || messages.wasError
);

export const selectSearchIsLoading = createSelector(
	selectSearchUsersState, selectSearchDialogsState, selectSearchMessagesState,
	(user, dialogs, messages) => user.isLoading || dialogs.isLoading || messages.isLoading
);

//exports
export const {
	clear: searchClear, setText: searchSetText, start: searchStart,
	success: searchSuccess, error: searchError, setCurrent: searchSetCurrent
} = searchSlice.actions;

export default searchSlice.reducer;
