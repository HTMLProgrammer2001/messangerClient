import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../index';


//reducer state type
export type IEditMeAvatarState = {
	isLoading: boolean,
	wasError: boolean
};

const initialState: IEditMeAvatarState = {
	isLoading: false,
	wasError: false
};

const editAvatarSlice = createSlice({
	name: 'editMe/avatar',
	initialState,
	reducers: {
		start(state, action: PayloadAction<FormData>){
			state.isLoading = true;
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
			state.wasError = true;
		},
		success(state, action: PayloadAction<null>){
			return {...initialState};
		}
	}
});

//selectors
export const selectEditMeAvatarState = (state: RootState) => state.editMe.avatar;

//exports
export const {
	start: editMeAvatarStart,
	error: editMeAvatarError,
	success: editMeAvatarSuccess
} = editAvatarSlice.actions;

export default editAvatarSlice.reducer;
