import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../index';
import mapIdWith from '../../../utils/helpers/mapIdWith';
import {IDialog} from '../../../interfaces/IDialog';
import {selectDialogs} from '../../dialogs';


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
		}
	}
});

//selectors
export const selectSearchDialogsState = (state: RootState) => state.search.dialogs;
export const selectSearchDialogsStateData = (state: RootState) => (
	mapIdWith<IDialog>(selectSearchDialogsState(state).data, selectDialogs(state)) as IDialog[]
);

//exports
export const {
	startName: searchDialogsStartName, startNick: searchDialogsStartNick,
	error: searchDialogsError, success: searchDialogsSuccess, clear: searchDialogsClear
} = searchDialogsSlice.actions;

export default searchDialogsSlice.reducer;
