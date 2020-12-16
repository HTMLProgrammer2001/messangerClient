import {APP_INITIALIZE_SUCCESS, APP_INITIALIZE_ERROR, APP_INITIALIZE_START} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';

//action types
type IAppActions = InferActionTypes<typeof actionCreators>;


//reducer state type
type IAppState = {
	initialized: boolean,
	isLoading: boolean
};

const initialState: IAppState = {
	initialized: false,
	isLoading: false
};

const appReducer = (state: IAppState = initialState, action: IAppActions) => {
	switch (action.type) {
		case APP_INITIALIZE_START:
			return {initialized: false, isLoading: true};

		case APP_INITIALIZE_ERROR:
			return {isLoading: false, initialized: false};

		case APP_INITIALIZE_SUCCESS:
			return {isLoading: false, initialized: true};
	}

	return state;
};

export default appReducer;
