import {LOGIN_SUCCESS, LOGIN_RESET, LOGIN_ERROR, LOGIN_VERIFY, LOGIN_CODE_VERIFY} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';
import {IErrors} from '../../interfaces/IErrors';
import {ILogInFormData} from '../../components/LogInPage/LogInForm';

//action types
type ILogInActions = InferActionTypes<typeof actionCreators>;


//reducer state type
type ILogInState = {
	verifing: boolean,
	errors: IErrors<ILogInFormData>,
	isLoading: boolean
};

const initialState: ILogInState = {
	verifing: false,
	errors: null,
	isLoading: false
};

const logInReducer = (state: ILogInState = initialState, action: ILogInActions) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {verifing: true, errors: null, isLoading: false};

		case LOGIN_ERROR:
			return {...state, errors: action.errors, isLoading: false};

		case LOGIN_RESET:
			return {...initialState};

		case LOGIN_VERIFY:
		case LOGIN_CODE_VERIFY:
			return {...state, isLoading: true};
	}

	return state;
};

export default logInReducer;
