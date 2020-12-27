import {IUserShort} from './IUserShort';


export type IMessage = {
	_id: string,
	type: string,
	time: number,
	text: string,
	from: IUserShort
};
