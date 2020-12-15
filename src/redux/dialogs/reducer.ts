import {DIALOGS_LOAD_ERROR, DIALOGS_LOAD_START, DIALOGS_LOAD_SUCCESS, DIALOGS_CURRENT_CHANGE} from './types';
import * as actionCreators from './actions';

import {InferActionTypes} from '../';
import {IDialog} from '../../interfaces/IDialog';

//get action types
type IDialogsActions = InferActionTypes<typeof actionCreators>;


//reducer state type
export type IDialogsState = {
	dialogs: Array<IDialog>,
	current: number,
	offset: number,
	loading: boolean,
	error: string
};

const initialState: IDialogsState = {
	dialogs: [{
		id: 1, 
		name: 'Test', 
		avatar: 'https://www.kinonews.ru/insimgs/poster/poster9623_1.jpg', 
		lastMessage: {
			text: 'Test text',
			time: '19:02PM'
		}, 
		nick: 'nik',
		unreaded: 0
	}, 
	{
		id: 2, 
		name: 'Test', 
		avatar: 'https://www.kinonews.ru/insimgs/poster/poster9623_1.jpg', 
		lastMessage: {
			text: 'Test text',
			time: '19:02PM'
		}, 
		nick: 'nik2',
		unreaded: 5
	}],
	offset: 1,
	current: null,
	loading: false,
	error: null
};

const dialogsReducer = (state: IDialogsState = initialState, action: IDialogsActions) => {
	switch (action.type) {
		case DIALOGS_LOAD_START:
			return {...state, loading: true, error: null};

		case DIALOGS_LOAD_ERROR:
			return {...state, loading: false, error: action.error};

		case DIALOGS_LOAD_SUCCESS:
			return {...state, loading: false, dialogs: action.payload};

		case DIALOGS_CURRENT_CHANGE:
			return {...state, current: action.payload == state.current ? null : action.payload};
	}

	return state;
};

export default dialogsReducer;
