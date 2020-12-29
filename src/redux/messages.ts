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
		addMany(state, action: PayloadAction<IMessage[]>){
			if(!action.payload)
				return;

			action.payload.forEach(dialog => {
				const id = dialog._id,
					cur = state[id] || {};

				state[id] = {...cur, ...dialog};
			});
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
