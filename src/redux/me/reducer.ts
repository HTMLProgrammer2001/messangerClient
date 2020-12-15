import {ME_RESET, ME_SET} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';
import {IUser} from '../../interfaces/IUser';

type IMeActions = InferActionTypes<typeof actionCreators>;


type IMeState = IUser;

const initialState: IMeState = {
	id: 1,
	avatar: '',
	name: 'Yuri Prisyazhny',
	nick: 'test'
};

const meReducer = (state: IMeState = initialState, action: IMeActions): IMeState => {
	switch (action.type) {
		case ME_SET:
			return action.payload;

		case ME_RESET:
			return {...initialState};
	}

	return state;
};

export default meReducer;
