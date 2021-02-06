import {normalize, schema} from 'normalizr';

import {IMessage} from '../../interfaces/IMessage';
import {IUser} from '../../interfaces/IUser';
import {IDialog} from '../../interfaces/IDialog';

const normalizeMessages = (data: IMessage[]) => {
	const dialog = new schema.Entity('dialogs', {}, {idAttribute: '_id'}),
		author = new schema.Entity('users', {}, {idAttribute: '_id'}),
		message = new schema.Entity('messages', {author, dialog}, {idAttribute: '_id'}),
		messages = new schema.Array(message);

	message.define({resend: messages});

	return normalize<any, {
		users: Record<string, IUser>,
		dialogs: Record<string, IDialog>,
		messages: Record<string, IMessage>
	}>(data, messages);
};

export default normalizeMessages;
