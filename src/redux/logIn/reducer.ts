import {LOGIN_SUCCESS, LOGIN_RESET} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';

//action types
type ILogInActions = InferActionTypes<typeof actionCreators>;


//reducer state type
type ILogInState = {
	verifing: boolean
};

const initialState: ILogInState = {
	verifing: false
};

const logInReducer = (state: ILogInState = initialState, action: ILogInActions) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {verifing: true};

		case LOGIN_RESET:
			return {verifing: false};
	}

	return state;
};

export default logInReducer;
