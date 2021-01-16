import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../index';
import {selectMeState} from '../me/slice';
import mapIdWith from '../../utils/helpers/mapIdWith';
import {selectMessages} from '../messages';
import {IMessage} from '../../interfaces/IMessage';


//initial state
type IChatSelectedState = string[];

const initialState: IChatSelectedState = [];

//create slice
const chatSelectedSlice = createSlice({
	name: 'chat/selected',
	initialState,
	reducers: {
		add(state, action: PayloadAction<string>){
			state.push(action.payload);
		},
		remove(state, action: PayloadAction<string>){
			return state.filter(id => id != action.payload);
		},
		toggle(state, action: PayloadAction<string>){
			return state.includes(action.payload) ?
				state.filter(id => id != action.payload) :
				[...state, action.payload];
		},
		clear(state, action: PayloadAction<null>){
			return [...initialState];
		}
	}
});

//selectors
export const selectChatSelectedState = (state: RootState) => state.chat.selected;
export const selectChatSelectedCount = (state: RootState) => selectChatSelectedState(state).length;
export const selectChatSelectedForCurrent = (state: RootState) => {
	const current = selectMeState(state).user;

	return (mapIdWith(selectChatSelectedState(state), selectMessages(state)) as IMessage[])
		.every(msg => <any>msg.author == current);
};

//exports
export const {
	add: chatSelectedAdd, remove: chatSelectedRemove,
	toggle: chatSelectedToggle, clear: chatSelectedClear
} = chatSelectedSlice.actions;

export default chatSelectedSlice.reducer;
