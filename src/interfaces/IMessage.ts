import {IUserShort} from './IUserShort';


export type IMessage = {
	_id: number,
	type: string,
	time: number,
	text: string,
	from: IUserShort
};
