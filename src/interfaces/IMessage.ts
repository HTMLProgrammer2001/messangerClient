import {IDialog} from './IDialog';
import {MessageTypes} from '../constants/MessageTypes';
import {IUser} from './IUser';


export type IMessage = {
	_id: string,
	type: MessageTypes,
	time: number,
	message: string,
	author: IUser,
	url?: string,
	size?: number,
	dialog?: IDialog,
	readed?: boolean
};
