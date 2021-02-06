import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../index';
import {IDialog} from '../../../interfaces/IDialog';

import mapIdWith from '../../../utils/helpers/mapIdWith';
import {selectDialogs} from '../../dialogs';


//initial state
type IResendDialogsState = {
	isLoading: boolean,
	error: string,
	dialogs: string[],
	offset: number,
	hasMore: boolean,
	text: string
}

const initialState: IResendDialogsState = {
	isLoading: false,
	error: null,
	dialogs: [],
	offset: 0,
	hasMore: false,
	text: ''
};

//create slice
const resendDialogsSlice = createSlice({
	name: 'resend/dialogs',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){
			return {...initialState, isLoading: true, text: action.payload};
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.error = action.payload;
		},
		success(state, action: PayloadAction<{dialogs: string[], hasMore: boolean, offset: number}>){
			state.dialogs = state.dialogs.concat(action.payload.dialogs);
			state.hasMore = action.payload.hasMore;
			state.offset = action.payload.offset;
			state.isLoading = false;
		},
		more(state, action: PayloadAction<null>){
			state.isLoading = true;
		}
	}
});

//selectors
export const selectDialogsResendState = (state: RootState) => state.resend.dialogs;
export const selectResendDialogs = (state: RootState) =>
	mapIdWith(state.resend.dialogs.dialogs, selectDialogs(state)) as IDialog[];

//exports
export const {
	start: resendLoadDialogsStart, 
	success: resendLoadDialogsSuccess, 
	error: resendLoadError, more: resendLoadMore} = resendDialogsSlice.actions;

export default resendDialogsSlice.reducer;
