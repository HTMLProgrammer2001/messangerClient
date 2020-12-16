import {IUser} from '../IUser';


export type ILoginResponse = {
	token: string,
	user: IUser
};
