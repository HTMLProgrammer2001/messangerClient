import {IMessage} from './IMessage';


export type IDialog = {
	_id: string,
	nick: string,
	avatar?: string,
	name: string,
	lastMessage?: IMessage,
	unreaded: number
};
