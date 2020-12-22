import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../../index';
import {IErrors} from '../../../interfaces/IErrors';
import {INewNameFormData} from '../../../components/PopUps/NewNamePopup/NewNameForm';


//reducer state type
export type IEditMeNameState = {
	isLoading: boolean,
	errors: IErrors<INewNameFormData>
};

const initialState: IEditMeNameState = {
	isLoading: false,
	errors: null
};

const editNameSlice = createSlice({
	name: 'editMe/name',
	initialState,
	reducers: {
		start(state, action: PayloadAction<INewNameFormData>){
			state.isLoading = true;
			state.errors = null;
		},
		error(state, action: PayloadAction<IErrors<INewNameFormData>>){
			state.isLoading = false;
			state.errors = action.payload;
		},
		success(state, action: PayloadAction<null>){
			return {...initialState};
		}
	}
});

//selectors
export const selectEditMeNameState = (state: RootState) => state.editMe.name;

//exports
export const {
	start: editMeNameStart,
	error: editMeNameError,
	success: editMeNameSuccess
} = editNameSlice.actions;

export default editNameSlice.reducer;
