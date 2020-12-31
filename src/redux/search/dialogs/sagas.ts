import {all, put, takeLeading, call} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';
import {schema, normalize} from 'normalizr';

import {IPaginateResponse} from '../../../interfaces/Responses/IPaginateResponse';
import {IDialog} from '../../../interfaces/IDialog';
import {IMessage} from '../../../interfaces/IMessage';
import {IUser} from '../../../interfaces/IUser';

import {
	searchDialogsStartName,
	searchDialogsStartNick,
	searchDialogsError,
	searchDialogsSuccess,
	ISearchDialogsSuccessProps
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

export function *searchDialogsNameSaga({payload: {name, offset = 1}}: ReturnType<typeof searchDialogsStartName>) {
	try {
		const dialogsResp: AxiosResponse<IDialogsResponse> = yield call(searchAPI.getDialogsByName, name, offset);

		const normalizedData = normalizeDialogResponse(dialogsResp.data.data);

		//parse data
		const dialogsData: ISearchDialogsSuccessProps = {
			dialogs: normalizedData.result,
			total: dialogsResp.data.total,
			offset: dialogsResp.data.page,
			totalPages: dialogsResp.data.totalPages
		};

		//set new data to store
		yield put(dialogsAddMany(normalizedData.entities.dialogs));
		yield put(usersAddMany(normalizedData.entities.users));
		yield put(messagesAddMany(normalizedData.entities.messages));

		//success
		yield put(searchDialogsSuccess(dialogsData));
	}
	catch (e) {
		//show error
		console.log(e);
		toast.error('Error in dialogs loading occured');
		yield put(searchDialogsError());
	}
}

export function *searchDialogsNickSaga({payload: {nick, offset = 1}}: ReturnType<typeof searchDialogsStartNick>) {
	try {
		const dialogsResp: AxiosResponse<IDialogsResponse> = yield call(searchAPI.getDialogsByNick, nick, offset);

		const normalizedData = normalizeDialogResponse(dialogsResp.data.data);

		//parse data
		const dialogsData: ISearchDialogsSuccessProps = {
			dialogs: normalizedData.result,
			total: dialogsResp.data.total,
			offset: dialogsResp.data.page,
			totalPages: dialogsResp.data.totalPages
		};

		//set new data to store
		yield put(dialogsAddMany(normalizedData.entities.dialogs));
		yield put(usersAddMany(normalizedData.entities.users));
		yield put(messagesAddMany(normalizedData.entities.messages));

		//success
		yield put(searchDialogsSuccess(dialogsData));
	}
	catch (e) {
		//show error
		console.log(e);
		toast.error('Error in dialogs loading occured');
		yield put(searchDialogsError());
	}
}

function *searchDialogsWatchSaga() {
	yield all([
		takeLeading(searchDialogsStartName.type, searchDialogsNameSaga),
		takeLeading(searchDialogsStartNick.type, searchDialogsNickSaga)
	]);
}

export default searchDialogsWatchSaga;
