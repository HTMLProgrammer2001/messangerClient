import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';


//initial state
type IBanState = {
	isLoading: boolean,
	error: string
}

export const initialState: IBanState = {
	isLoading: false,
	error: null
};

//create slice
const banSlice = createSlice({
	name: 'ban',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>) {
			state.isLoading = true;
			state.error = null;
		},
		error(state, action: PayloadAction<string>) {
			state.isLoading = false;
			state.error = action.payload;
		},
		success(state, action: PayloadAction<null>){
			state.isLoading = false;
		}
	}
});

//selectors
export const selectBanState = (state: RootState) => state.ban;

//exports
export const {start: banStart, success: banSuccess, error: banError} = banSlice.actions;
export default banSlice.reducer;
