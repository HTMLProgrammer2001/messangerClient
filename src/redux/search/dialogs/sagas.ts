import {all, put, takeLeading, call} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IPaginateResponse} from '../../../interfaces/Responses/IPaginateResponse';
import {IDialog} from '../../../interfaces/IDialog';
import {
	searchDialogsStartName,
	searchDialogsStartNick,
	searchDialogsError,
	searchDialogsSuccess,
	ISearchDialogsSuccessProps
} from './slice';
import {dialogsAddMany} from '../../dialogs';
import searchAPI from '../../../utils/api/searchAPI';


type IDialogsResponse = IPaginateResponse<IDialog>

export function *searchDialogsNameSaga({payload: {name, offset = 1}}: ReturnType<typeof searchDialogsStartName>) {
	try {
		const dialogsResp: AxiosResponse<IDialogsResponse> = yield call(searchAPI.getDialogsByName, name, offset);

		//set dialogs
		const dialogsData: ISearchDialogsSuccessProps = {
			dialogs: dialogsResp.data.data.map(dlg => dlg._id),
			total: dialogsResp.data.total,
			offset: dialogsResp.data.page,
			totalPages: dialogsResp.data.totalPages
		};

		yield put(dialogsAddMany(dialogsResp.data.data));
		yield put(searchDialogsSuccess(dialogsData));
	}
	catch (e) {
		//show error
		toast.error('Error in dialogs loading occured');
		yield put(searchDialogsError());
	}
}

export function *searchDialogsNickSaga({payload: {nick, offset = 1}}: ReturnType<typeof searchDialogsStartNick>) {
	try {
		const dialogsResp: AxiosResponse<IDialogsResponse> = yield call(searchAPI.getDialogsByNick, nick, offset);

		//set dialogs
		const dialogsData: ISearchDialogsSuccessProps = {
			dialogs: dialogsResp.data.data.map(msg => msg._id),
			total: dialogsResp.data.total,
			offset: dialogsResp.data.page,
			totalPages: dialogsResp.data.totalPages
		};

		yield put(dialogsAddMany(dialogsResp.data.data));
		yield put(searchDialogsSuccess(dialogsData));
	}
	catch (e) {
		//show error
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
