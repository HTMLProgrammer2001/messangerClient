import {ME_RESET, ME_SET} from './types';
import {IUser} from '../../interfaces/IUser';


export const meSet = (user: IUser) => <const>({
	type: ME_SET,
	payload: user
});

export const meReset = () => <const>({
	type: ME_RESET
});
