import {SIGNIN_SUCCESS, SIGNIN_RESET, SIGNIN_ERROR, SIGNIN_CODE_VERIFY, SIGNIN_VERIFY} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';

//get action type
type ISignInActions = InferActionTypes<typeof actionCreators>;


//reducer state type
type ISignInState = {
	verifing: boolean,
	isLoading: boolean,
	errors: Object
};

const initialState: ISignInState = {
	verifing: false,
	isLoading: false,
	errors: null
};

const signInReducer = (state: ISignInState = initialState, action: ISignInActions) => {
	switch (action.type) {
		case SIGNIN_SUCCESS:
			return {verifing: true, isLoading: false, errors: null};

		case SIGNIN_ERROR:
			return {...state, isLoading: false, errors: action.payload};

		case SIGNIN_RESET:
			return {verifing: false, errors: null, isLoading: false};

		case SIGNIN_CODE_VERIFY:
		case SIGNIN_VERIFY:
			return {...state, isLoading: true};
	}

	return state;
};

export default signInReducer;
