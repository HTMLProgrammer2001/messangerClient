import {IUser} from '../IUser';


export type ISignInResponse = {
	message: string,
	token: string,
	user: IUser
}
