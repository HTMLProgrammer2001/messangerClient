import {IUserShort} from './IUserShort';


export type IMessage = {
	id: number,
	type: string,
	time: number,
	text: string,
	from: IUserShort
};
