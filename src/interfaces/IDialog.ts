import {IMessage} from './IMessage';
import {IUser} from './IUser';


export type IDialog = {
	_id: string,
	nick: string,
	avatar?: string,
	name: string,
	lastMessage?: IMessage,
	unread: number,
	user?: IUser
};
