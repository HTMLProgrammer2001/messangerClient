import {CHANGE_SUCCESS, CHANGE_RESET, CHANGE_ERROR, CHANGE_VERIFY, CHANGE_CODE_VERIFY} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';
import {IErrors} from '../../interfaces/IErrors';
import {IChangeFormData} from '../../components/ChangePhonePage/ChangeForm';

//action types
type IChangeActions = InferActionTypes<typeof actionCreators>;


//reducer state type
type IChangeState = {
	verifing: boolean,
	errors: IErrors<IChangeFormData>,
	isLoading: boolean
};

const initialState: IChangeState = {
	verifing: false,
	errors: null,
	isLoading: false
};

const changeReducer = (state: IChangeState = initialState, action: IChangeActions) => {
	switch (action.type) {
		case CHANGE_SUCCESS:
			return {verifing: true, errors: null, isLoading: false};

		case CHANGE_ERROR:
			return {...state, errors: action.errors, isLoading: false};

		case CHANGE_RESET:
			return {...initialState};

		case CHANGE_VERIFY:
		case CHANGE_CODE_VERIFY:
			return {...state, isLoading: true};
	}

	return state;
};

export default changeReducer;
