import {normalize, schema} from 'normalizr';

import {IDialog} from '../../interfaces/IDialog';
import {IMessage} from '../../interfaces/IMessage';
import {IUser} from '../../interfaces/IUser';


const normalizeDialogResponse = (resp: IDialog[]) => {
	const author = new schema.Entity('users', {}, {idAttribute: '_id'}),
		messages = new schema.Entity('messages', {author}, {idAttribute: '_id'}),
		dialog = new schema.Entity('dialogs', {lastMessage: messages}, {idAttribute: '_id'});

	const respSchema = new schema.Array(dialog);
	return normalize<any, {
		dialogs: Record<string, IDialog>,
		messages: Record<string, IMessage>,
		users: Record<string, IUser>
	}>(resp, respSchema);
};

export default normalizeDialogResponse;
