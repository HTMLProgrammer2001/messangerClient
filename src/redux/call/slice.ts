import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';


//initial state
type ICallState = {
	isCalling: boolean,
	isInitiator: boolean,
	callWith: string
}

const initialState: ICallState = {
	isCalling: false,
	isInitiator: false,
	callWith: null
};

//create slice
const callSlice = createSlice({
	name: 'call',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){
			state.isCalling = true;
			state.callWith = action.payload;
		},
		success(state, action: PayloadAction<string>){
			state.isCalling = false;
			state.callWith = action.payload;
		},
		error(state, action: PayloadAction<null>){
			return {...initialState};
		}
	}
});

//selectors
export const selecctCallState = (state: RootState) => state.call;

//exports
export const {start: callStart, error: callError, success: callSuccess} = callSlice.actions;
export default callSlice.reducer;
