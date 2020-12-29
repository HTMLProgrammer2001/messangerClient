import {IUserShort} from './IUserShort';
import {IDialog} from './IDialog';


export type IMessage = {
	_id: string,
	type: string,
	time: number,
	message: string,
	from: IUserShort,
	dialog?: IDialog
};
