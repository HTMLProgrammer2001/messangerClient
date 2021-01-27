import {createAction} from '@reduxjs/toolkit';
import {takeEvery, put, select} from 'redux-saga/effects';

import {usersAdd, selectUserById} from '../../users';


//create actions
export const wsUserOnline = createAction<string>('WS/user/online');

//sagas
function *userOnlineSaga({payload: userID}: ReturnType<typeof wsUserOnline>) {
	const user = yield select(selectUserById(userID));

	if(user)
		yield put(usersAdd({_id: userID, isOnline: true} as any));
}

function *watchUserOnlineSaga() {
	yield takeEvery(wsUserOnline.type, userOnlineSaga);
}

export default watchUserOnlineSaga;
