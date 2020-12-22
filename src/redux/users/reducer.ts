import {USERS_RESET, USERS_ADD, USERS_START, USERS_ERROR} from './types';
import * as actionCreators from './actions';
import {InferActionTypes} from '../';
import {IUser} from '../../interfaces/IUser';

type IUsersActions = InferActionTypes<typeof actionCreators>;


type IUsersState = {
	isLoading: boolean,
	error: string,
	users: Array<IUser>
};

const initialState: IUsersState = {
	isLoading: false,
	error: null,
	users: [
		{name: 'Yura', avatar: null, nickname: 'somenick', id: 1, role: 1, opts: {}},
		{name: 'Ira', avatar: null, nickname: 'nick2', id: 2, role: 1, opts: {}},
		{name: 'Angelina', avatar: null, nickname: 'nick3', id: 3, role: 1, opts: {}}
	]
};

const usersReducer = (state: IUsersState = initialState, action: IUsersActions): IUsersState => {
	switch (action.type) {
		case USERS_RESET:
			return {...initialState};

		case USERS_ADD:
			return {...initialState, users: [...state.users, ...action.payload]};

		case USERS_ERROR:
			return {...state, isLoading: false, error: action.error};

		case USERS_START:
			return {...state, isLoading: true, error: null};
	}

	return state;
};

export default usersReducer;
