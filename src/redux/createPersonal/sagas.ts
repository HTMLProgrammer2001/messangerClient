import {takeLeading, put, all, call, select} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {createPersonalStart, createPersonalError, createPersonalSuccess} from './slice';
import {searchSetCurrent, selectSearchCurrent} from '../search/state/slice';
import chatAPI from '../../utils/api/chatAPI';


export function *createPersonalSaga({payload: id}: ReturnType<typeof createPersonalStart>) {
	try {
		yield call(chatAPI.createPersonal, id);

		//success load
		const current = yield select(selectSearchCurrent);
		yield put(searchSetCurrent(current));
		yield put(createPersonalSuccess());
	}
	catch (e) {
		toast.error(e.response?.data.message || e.message);
		yield put(createPersonalError(e.response?.data.message || e.message));
	}
}

function *createPersonalWatchSaga() {
	yield all([
		takeLeading(createPersonalStart.type, createPersonalSaga)
	]);
}

export default createPersonalWatchSaga;
