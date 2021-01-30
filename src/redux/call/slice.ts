import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../index';
import {selectUsers} from '../users';


//initial state
type ICallState = {
	isCalling: boolean,
	isSpeaking: boolean,
	isInitiator: boolean,
	callWith: string
}

const initialState: ICallState = {
	isCalling: false,
	isSpeaking: false,
	isInitiator: false,
	callWith: null
};

//create slice
const callSlice = createSlice({
	name: 'call',
	initialState,
	reducers: {
		start(state, action: PayloadAction<string>){
			state.isInitiator = true;
			state.isCalling = true;
			state.callWith = action.payload;
		},
		receive(state, action: PayloadAction<string>){
			state.isCalling = true;
			state.isInitiator = false;
			state.callWith = action.payload;
		},
		connected(state, action: PayloadAction<string>){
			state.isCalling = false;
			state.isSpeaking = true;
		},
		disconnect(state, action: PayloadAction<string>){
			return {...initialState};
		},
		error(state, action: PayloadAction<null>){
			return {...initialState};
		}
	}
});

//selectors
export const selectCallState = (state: RootState) => state.call;
export const selectCallUser = (state: RootState) => selectUsers(state)[state.call.callWith];

//exports
export const {
	start: callStart, error: callError, connected: callConnected,
	disconnect: callDisconnect, receive: callReceive
} = callSlice.actions;

export default callSlice.reducer;
