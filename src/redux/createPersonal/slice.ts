import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';


//create initial state
type ICreatePersonalData = {
	isLoading: boolean
}

const initialState: ICreatePersonalData = {
	isLoading: false
};

//create slice
const createPersonalSlice = createSlice({
	name: 'create/personal',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){
			state.isLoading = true;
		},
		error(state, action: PayloadAction<string>){
			state.isLoading = false;
		},
		success(state, action: PayloadAction<null>){
			state.isLoading = false;
		}
	}
});

//create selectors
export const selectCreatePersonalState = (state: RootState) => state.createPersonal;

//exports
export const {
	start: createPersonalStart, success: createPersonalSuccess,
	error: createPersonalError
} = createPersonalSlice.actions;

export default createPersonalSlice.reducer;
