import {all, put, takeEvery, select, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {schema, normalize} from 'normalizr';

import {IPaginateResponse} from '../../../interfaces/Responses/IPaginateResponse';
import {IMessage} from '../../../interfaces/IMessage';
import {IUser} from '../../../interfaces/IUser';
import {IDialog} from '../../../interfaces/IDialog';

import {chatMessagesStart, chatMessagesError, chatMessagesSuccess, selectChatMessagesState, chatMessagesClear} from './slice';
import {selectChatDialogState} from '../dialog/slice';
import {messagesAddMany} from '../../messages';
import {usersAddMany} from '../../users';
import {dialogsAddMany} from '../../dialogs';
import chatAPI from '../../../utils/api/chatAPI';


type IGetMessagesResp = AxiosResponse<IPaginateResponse<IMessage>>


const normalizeMessages = (data: IMessage[]) => {
	const dialog = new schema.Entity('dialogs', {}, {idAttribute: '_id'}),
		author = new schema.Entity('users', {}, {idAttribute: '_id'}),
		message = new schema.Entity('messages', {author, dialog}, {idAttribute: '_id'});

	return normalize<any, {
		users: Record<string, IUser>,
		dialogs: Record<string, IDialog>,
		messages: Record<string, IMessage>
	}>(data, new schema.Array(message));
};

function *getMessagesForChatSaga() {
	try{
		//get data from redux
		const {offset} = yield select(selectChatMessagesState),
			{dialog} = yield select(selectChatDialogState);

		if(!dialog) {
			//clear message state
			yield put(chatMessagesClear());
			return;
		}

		//make api call
		const resp: IGetMessagesResp = yield call(chatAPI.getMessagesForChat, dialog, offset + 1),
			normalizedResp = normalizeMessages(resp.data.data);

		//add data to store
		yield put(messagesAddMany(normalizedResp.entities.messages));
		yield put(dialogsAddMany(normalizedResp.entities.dialogs));
		yield put(usersAddMany(normalizedResp.entities.users));

		//success message loading
		yield put(chatMessagesSuccess({
			data: normalizedResp.result,
			offset: resp.data.page,
			totalPages: resp.data.totalPages
		}));
	}
	catch (e) {
		//set error
		yield put(chatMessagesError());
	}
}

function *watchChatMessagesSaga() {
	yield all([
		takeEvery(chatMessagesStart.type, getMessagesForChatSaga)
	]);
}

export default watchChatMessagesSaga;
