import {ME_RESET, ME_SET, ME_START} from './types';
import {IUser} from '../../interfaces/IUser';


export const meStart = () => <const>({
	type: ME_START
});

export const meSet = (user: IUser) => <const>({
	type: ME_SET,
	payload: user
});

export const meReset = () => <const>({
	type: ME_RESET
});
