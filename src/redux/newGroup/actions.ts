import {GROUP_SET_USERS, GROUP_CREATE, GROUP_ADD_USER, GROUP_DELETE_USER, GROUP_TOGGLE_USER} from './types';


export const groupCreate = () => <const>({
	type: GROUP_CREATE
});

export const groupAdd = (id: number) => <const>({
	type: GROUP_ADD_USER,
	payload: id
});

export const groupDelete = (id: number) => <const>({
	type: GROUP_DELETE_USER,
	payload: id
});

export const groupSet = (users: Array<number>) => <const>({
	type: GROUP_SET_USERS,
	payload: users
});

export const groupToggle = (id: number) => <const>({
	type: GROUP_TOGGLE_USER,
	payload: id
});
