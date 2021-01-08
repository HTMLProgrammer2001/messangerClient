import {IUserShort} from './IUserShort';
import {IDialog} from './IDialog';
import {MessageTypes} from '../constants/MessageTypes';


export type IMessage = {
	_id: string,
	type: MessageTypes,
	time: number,
	message: string,
	author: IUserShort,
	url?: string,
	size?: number,
	dialog?: IDialog
};
