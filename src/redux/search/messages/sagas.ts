import {all, put, takeLeading, call} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';
import {schema, normalize} from 'normalizr';

import {IPaginateResponse} from '../../../interfaces/Responses/IPaginateResponse';
import {IMessage} from '../../../interfaces/IMessage';
import {IUser} from '../../../interfaces/IUser';
import {IDialog} from '../../../interfaces/IDialog';

import {searchMessagesStart, searchMessagesError, searchMessagesSuccess} from './slice';
import {messagesAddMany} from '../../messages';
import {dialogsAddMany} from '../../dialogs';
import {usersAddMany} from '../../users';
import searchAPI from '../../../utils/api/searchAPI';


type IMessagesResponse = IPaginateResponse<IMessage>

const normalizeMessagesResp = (resp: IMessage[]) => {
	const users = new schema.Entity('users', {}, {idAttribute: '_id'}),
		dialogs = new schema.Entity('dialogs', {}, {idAttribute: '_id'}),
		messages = new schema.Entity('messages', {author: users, dialog: dialogs}, {idAttribute: '_id'});

	return normalize<any, {
		users: Record<string, IUser>,
		dialogs: Record<string, IDialog>,
		messages: Record<string, IMessage>
	}>(resp, [messages]);
};

export function *searchMessagesSaga({payload: {text, offset = 1}}: ReturnType<typeof searchMessagesStart>) {
	try {
		const messageResp: AxiosResponse<IMessagesResponse> = yield call(searchAPI.getMessagesByText, text, offset);

		const normalizedMessageResp = normalizeMessagesResp(messageResp.data.data);

		//set messages
		const messagesData = {
			messages: normalizedMessageResp.result,
			total: messageResp.data.total,
			offset: messageResp.data.page,
			totalPages: messageResp.data.totalPages
		};

		console.log(normalizedMessageResp);

		//add data to store
		yield put(messagesAddMany(normalizedMessageResp.entities.messages));
		yield put(dialogsAddMany(normalizedMessageResp.entities.dialogs));
		yield put(usersAddMany(normalizedMessageResp.entities.users));

		//success
		yield put(searchMessagesSuccess(messagesData));
	}
	catch (e) {
		//show error
		toast.error('Error in messages loading occured');
		yield put(searchMessagesError());
	}
}

function *searchMessagesWatchSaga() {
	yield all([
		takeLeading(searchMessagesStart.type, searchMessagesSaga)
	]);
}

export default searchMessagesWatchSaga;
