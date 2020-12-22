import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IErrors} from '../../../interfaces/IErrors';
import {INewNickFormData} from '../../../components/PopUps/NewNickPopup/NewNickForm';
import {RootState} from '../../index';


//reducer state type
export type IEditMeNickState = {
	isLoading: boolean,
	errors: IErrors<INewNickFormData>
};

const initialState: IEditMeNickState = {
	isLoading: false,
	errors: null
};

const editNickSlice = createSlice({
	name: 'editMe/nick',
	initialState,
	reducers: {
		start(state, action: PayloadAction<INewNickFormData>){
			state.isLoading = true;
		},
		error(state, action: PayloadAction<IErrors<INewNickFormData>>){
			state.isLoading = false;
			state.errors = action.payload;
		},
		success(state, action: PayloadAction<null>){
			state.isLoading = false;
			state.errors = null;
		}
	}
});

//selectors
export const selectEditMeNickState = (state: RootState) => state.editMe.nick;

//exports
export const {start: editMeNickStart, success: editMeNickSuccess, error: editMeNickError} = editNickSlice.actions;
export default editNickSlice.reducer;
