import {CHAT_LOAD_ERROR, CHAT_LOAD_SUCCESS, CHAT_LOAD_START} from './types';
import * as actionCreators from './actions';

import {InferActionTypes} from '../';
import {IMessage} from '../../interfaces/IMessage';
import {IUserShort} from '../../interfaces/IUserShort';

//get action types
type IChatActions = InferActionTypes<typeof actionCreators>;


//reducer state type
export type IChatState = {
	chatID: number,
	with: IUserShort,
	messages: Array<IMessage>,
	offset: number,
	loading: boolean,
	error: string
};

const initialState: IChatState = {
	chatID: 1,
	with: {
		_id: '1',
		nick: 'dlg1',
		name: 'Some name',
		lastSeen: 'online'
	},
	messages: [{
		_id: '1',
		type: 'text',
		time: +(new Date()) - 3600 * 1455 * 1000,
		text: 'Test text',
		from: {
			_id: '1',
			name: 'Some name',
			nick: 'nick',
			lastSeen: 'online'
		}
	}, {
		_id: '1',
		type: 'text',
		time: +(new Date()) - 3600 * 21 * 1000,
		text: 'Test text',
		from: {
			_id: '1',
			name: 'Some name',
			nick: 'nick',
			lastSeen: 'online'
		}
	}, {
		_id: '1',
		type: 'text',
		time: +(new Date()),
		text: 'Test text',
		from: {
			_id: '1',
			name: 'Some name',
			nick: 'nick',
			lastSeen: 'online'
		}
	}, {
		_id: '1',
		type: 'text',
		time: +(new Date()),
		text: 'Test text',
		from: {
			_id: '1',
			name: 'Some name',
			nick: 'nick',
			lastSeen: 'online'
		}
	}],
	offset: 1,
	loading: false,
	error: null
};

const chatReducer = (state: IChatState = initialState, action: IChatActions) => {
	switch (action.type) {
		case CHAT_LOAD_START:
			return {...state, loading: true, error: null};

		case CHAT_LOAD_ERROR:
			return {...state, loading: false, error: action.error};

		case CHAT_LOAD_SUCCESS:
			return {...state, loading: false, messages: action.payload};
	}

	return state;
};

export default chatReducer;
