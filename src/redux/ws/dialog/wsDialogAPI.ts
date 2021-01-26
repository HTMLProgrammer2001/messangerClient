import {createAction} from '@reduxjs/toolkit';
import {put, takeLeading, all, take, fork} from 'redux-saga/effects';
import {channel} from 'redux-saga';

import ws from '../../../utils/ws';
import {wsToggle} from './banUser';


//create actions
export const wsDialogConnect = createAction('WS/dialog/connect');
export const wsDialogDisconnect = createAction('WS/dialog/disconnect');

//create channel
const wsChannel = channel();

function *listenChannel() {
	while (true){
		const action = yield take(wsChannel);
		yield put(action);
	}
}

//handlers
const banHandler = (banFrom: string) => wsChannel.put(wsToggle(banFrom));

function *connectSaga() {
	ws.addHandler('toggleBan', banHandler);
}

function *disconnectSaga() {
	ws.removeHandler('toggleBan', banHandler);
}

export default function *watchWSSaga() {
	yield fork(listenChannel);

	yield all([
		takeLeading(wsDialogConnect.type, connectSaga),
		takeLeading(wsDialogDisconnect.type, disconnectSaga)
	]);
}
