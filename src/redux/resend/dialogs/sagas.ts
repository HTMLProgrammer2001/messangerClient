import {all, call, put, select, takeLeading} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {normalize, schema} from 'normalizr';

import {IPaginateResponse} from '../../../interfaces/Responses/IPaginateResponse';
import {IDialog} from '../../../interfaces/IDialog';
import {IMessage} from '../../../interfaces/IMessage';
import {IUser} from '../../../interfaces/IUser';

import {
	resendLoadDialogsStart,
	resendLoadDialogsSuccess,
	resendLoadError,
	resendLoadMore,
	selectDialogsResendState
} from './slice';
import {dialogsAddMany} from '../../dialogs';
import {messagesAddMany} from '../../messages';
import {usersAddMany} from '../../users';
import searchAPI from '../../../utils/api/searchAPI';


type IDialogsResponse = IPaginateResponse<IDialog>

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

export function *searchDialogsName(name: string, offset = 1) {
	try {
		const dialogsResp: AxiosResponse<IDialogsResponse> = yield call(searchAPI.getDialogsByName, name, offset);
		const normalizedData = normalizeDialogResponse(dialogsResp.data.data);

		//parse data
		const dialogsData = {
			dialogs: normalizedData.result,
			offset: dialogsResp.data.page,
			hasMore: dialogsResp.data.page < dialogsResp.data.totalPages
		};

		//set new data to store
		yield put(dialogsAddMany(normalizedData.entities.dialogs));
		yield put(usersAddMany(normalizedData.entities.users));
		yield put(messagesAddMany(normalizedData.entities.messages));

		//success
		yield put(resendLoadDialogsSuccess(dialogsData));
	}
	catch (e) {
		//show error
		yield put(resendLoadError(e.response?.data.message || e.message));
	}
}

export function *searchDialogsNick(nick: string, offset = 1) {
	try {
		const dialogsResp: AxiosResponse<IDialogsResponse> = yield call(searchAPI.getDialogsByNick, nick, offset);
		const normalizedData = normalizeDialogResponse(dialogsResp.data.data);

		//parse data
		const dialogsData = {
			dialogs: normalizedData.result,
			total: dialogsResp.data.total,
			offset: dialogsResp.data.page,
			hasMore: dialogsResp.data.page < dialogsResp.data.totalPages
		};

		//set new data to store
		yield put(dialogsAddMany(normalizedData.entities.dialogs));
		yield put(usersAddMany(normalizedData.entities.users));
		yield put(messagesAddMany(normalizedData.entities.messages));

		//success
		yield put(resendLoadDialogsSuccess(dialogsData));
	}
	catch (e) {
		//show error
		yield put(resendLoadError(e.response?.data.message || e.message));
	}
}

function* searchResendDialogs() {
	const {text, offset} = yield select(selectDialogsResendState);

	if(text.startsWith('@'))
		yield call(searchDialogsNick, text.slice(1), offset + 1);
	else
		yield call(searchDialogsName, text, offset + 1);
}

function *resendDialogsWatchSaga() {
	yield all([
		takeLeading(resendLoadDialogsStart.type, searchResendDialogs),
		takeLeading(resendLoadMore.type, searchResendDialogs)
	]);
}

export default resendDialogsWatchSaga;
