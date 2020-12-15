import {USERS_ADD, USERS_RESET, USERS_ERROR, USERS_LOAD, USERS_START} from './types';
import {IUser} from '../../interfaces/IUser';


export const usersAdd = (users: Array<IUser>) => <const>({
	type: USERS_ADD,
	payload: users
});

export const usersStart = () => <const>({
	type: USERS_START
});

export const usersReset = () => <const>({
	type: USERS_RESET
});

export const usersError = (error: string) => <const>({
	type: USERS_ERROR,
	error
});

export const usersLoad = (offset: number) => <const>({
	type: USERS_LOAD,
	offset
});
