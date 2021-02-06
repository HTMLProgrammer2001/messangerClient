import {all, call, put, takeLeading} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IPaginateResponse} from '../../../interfaces/Responses/IPaginateResponse';
import {IDialog} from '../../../interfaces/IDialog';

import {
	ISearchDialogsSuccessProps,
	searchDialogsError,
	searchDialogsStartName,
	searchDialogsStartNick,
	searchDialogsSuccess
} from './slice';
import {dialogsAddMany} from '../../dialogs';
import {messagesAddMany} from '../../messages';
import {usersAddMany} from '../../users';
import searchAPI from '../../../utils/api/searchAPI';
import normalizeDialogResponse from '../../../utils/normalizers/dialogsNormalize';


type IDialogsResponse = IPaginateResponse<IDialog>


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
