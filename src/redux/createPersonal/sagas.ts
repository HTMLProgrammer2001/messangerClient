import {takeLeading, put, all} from 'redux-saga/effects';

import {createPersonalStart, createPersonalError, createPersonalSuccess} from './slice';


function *createPersonalSaga({payload: nick}: ReturnType<typeof createPersonalStart>) {
	try {
		yield put(createPersonalSuccess());
	}
	catch (e) {
		yield put(createPersonalError(e.response?.data.message || e.message));
	}
}

function *createPersonalWatchSaga() {
	yield all([
		takeLeading(createPersonalStart.type, createPersonalSaga)
	]);
}

export default createPersonalWatchSaga;
