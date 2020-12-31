import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IMessage} from '../interfaces/IMessage';
import {RootState} from './index';


//create initial state
type IMessageState = Record<string, IMessage>;
const initialState: IMessageState = {};

//create slice
const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		add(state, action: PayloadAction<IMessage>){
			const id = action.payload._id,
				cur = state[id] || {};

			state[id] = {...cur, ...action.payload};
		},
		addMany(state, action: PayloadAction<Record<string, IMessage>>){
			if(!action.payload)
				return;

			for(let id in action.payload){
				let cur = state[id] || {};

				//set or change message
				state[id] = {...cur, ...action.payload[id]};
			}
		},
		clear(state, action: PayloadAction<null>){
			return {};
		}
	}
});

//selectors
export const selectMessages = (state: RootState) => state.messages;

//exports
export const {add: messagesAdd, addMany: messagesAddMany, clear: messagesClear} = messageSlice.actions;
export default messageSlice.reducer;
