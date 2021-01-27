import {createAction} from '@reduxjs/toolkit';
import {takeEvery, put, select} from 'redux-saga/effects';

import {usersAdd, selectUserById} from '../../users';


//create actions
export const wsUserOffline = createAction<string>('WS/user/offline');

//sagas
function *userOfflineSaga({payload: userID}: ReturnType<typeof wsUserOffline>) {
	const user = yield select(selectUserById(userID));

	if(user)
		yield put(usersAdd({_id: userID, isOnline: false, lastSeen: Date.now()} as any));
}

function *watchUserOfflineSaga() {
	yield takeEvery(wsUserOffline.type, userOfflineSaga);
}

export default watchUserOfflineSaga;
