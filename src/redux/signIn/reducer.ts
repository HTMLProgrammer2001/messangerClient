import {SIGNIN_SUCCESS, SIGNIN_RESET} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';

//get action type
type ISignInActions = InferActionTypes<typeof actionCreators>;


//reducer state type
type ISignInState = {
	verifing: boolean
};

const initialState: ISignInState = {
	verifing: false
};

const signInReducer = (state: ISignInState = initialState, action: ISignInActions) => {
	switch (action.type) {
		case SIGNIN_SUCCESS:
			return {verifing: true};

		case SIGNIN_RESET:
			return {verifing: false};
	}

	return state;
};

export default signInReducer;
