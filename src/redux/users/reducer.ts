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
		{name: 'Yura', avatar: null, nick: 'somenick', userID: 1},
		{name: 'Ira', avatar: null, nick: 'nick2', userID: 2},
		{name: 'Angelina', avatar: null, nick: 'nick3', userID: 3}
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
