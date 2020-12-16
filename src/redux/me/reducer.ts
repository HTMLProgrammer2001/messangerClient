import {ME_RESET, ME_SET} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';
import {IUser} from '../../interfaces/IUser';

type IMeActions = InferActionTypes<typeof actionCreators>;


type IMeState = {
	isLoading: boolean,
	user: IUser
};

const initialState: IMeState = {
	isLoading: false,
	user: null
};

const meReducer = (state: IMeState = initialState, action: IMeActions): IMeState => {
	switch (action.type) {
		case ME_SET:
			return {isLoading: false, user: action.payload};

		case ME_RESET:
			return {...initialState};
	}

	return state;
};

export default meReducer;
