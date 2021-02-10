import {IMessage} from './IMessage';
import {IUser} from './IUser';
import {ParticipantsTypes} from '../constants/ParticipantTypes';


export type IDialog = {
	_id: string,
	nick: string,
	avatar?: string,
	name: string,
	lastMessage?: IMessage,
	unread: number,
	partCount: number,
	user?: IUser,
	isActive: boolean,
	myRole: ParticipantsTypes
};
